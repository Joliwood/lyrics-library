class CoreDatamapper {
  tableName;

  constructor(client) {
    this.client = client;
  }

  // Normaly this method should be called in the constructor but this.tableName is not defined yet
  // So we will make this method disponible and let the datasource call it after each constructor
  init() {
    // This idsLoader allows to order all results by id, for every query request
    this.idsLoader = this.client.query
      .from(this.tableName)
      .batch(async (query, ids) => {
        const rows = await query.whereIn('id', ids);
        return ids.map((id) => rows.find((row) => row.id === id));
      });
  }

  async findByPk(id) {
    const row = await this.client.query.from(this.tableName).where({ id }).first();
    return row;
  }

  async findAll(params) {
    const query = this.client.query.from(this.tableName);
    if (params) {
      query.where(params);
    }
    const rows = await query;
    return rows;
  }

  // We have to add [] to the row with .returning('*') so it returns all we ask in the query
  async create(inputData) {
    const [row] = await this.client.query.from(this.tableName).insert(inputData).returning('*');
    return row;
  }

  async update(id, inputData) {
    const [row] = await this.client.query.from(this.tableName).update(inputData).where({ id }).returning('*');
    return row;
  }

  async delete(id) {
    const result = await this.client.query.from(this.tableName).where({ id }).del();
    return result;
  }
}

export default CoreDatamapper;
