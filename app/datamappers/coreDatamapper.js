class CoreDatamapper {
  tableName;

  constructor(client) {
    this.client = client;
  }

  async findByPk(id) {
    const row = await this.client.query.from(this.tableName).where({ id });
    return row;
  }

  async findAll(params) {
    const query = this.client.query.from(this.tableName);
    if (params?.where) {
      query.where(params?.where);
    }
    const rows = await query;
    return rows;
  }

  async create(inputData) {
    const row = await this.client.query.insert(inputData).into(this.tableName);
    return row;
  }

  async update(id, inputData) {
    const row = await this.client.query.from(this.tableName).update(inputData).where({ id });
    return row;
  }

  async delete(id) {
    const result = await this.client.query.from(this.tableName).where({ id }).del();
    return result;
  }
}

export default CoreDatamapper;
