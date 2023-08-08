class CoreDatamapper {
  tableName;

  constructor(client) {
      this.client = client;
  }

  async findAll(params) {
      let filter = '';
    const values = [];

      if (params?.$where) {
          const filters = [];
          let indexPlaceholder = 1;

          Object.entries(params.$where).forEach(([param, value]) => {
              if (param === '$or') {
                  const filtersOr = [];
                  Object.entries(value).forEach(([key, val]) => {
                      filtersOr.push(`"${key}" = $${indexPlaceholder}`);
                      values.push(val);
                      indexPlaceholder += 1;
                  });
                  filters.push(`(${filtersOr.join(' OR ')})`);
              } else {
                  filters.push(`"${param}" = $${indexPlaceholder}`);
                  values.push(value);
                  indexPlaceholder += 1;
              }
          });
          filter = `WHERE ${filters.join(' AND ')}`;
      }

      const preparedQuery = {
          text: `
              SELECT * FROM "${this.tableName}"
              ${filter}
          `,
          values,
      };

      const result = await this.client.query(preparedQuery);

      return result.rows;
  }
}

export default CoreDatamapper;