const knex = require('../db/knex.js');

class CoreDataMapper {
  constructor(tableName) {
    this.tableName = tableName;
  }

  async findAll() {
    return knex(this.tableName).select('*');
  }

  async findById(id) {
    return knex(this.tableName).where({ id }).first();
  }

  async create(data) {
    const [id] = await knex(this.tableName).insert(data, 'id');
    return id;
  }

  async update(id, data) {
    await knex(this.tableName).where({ id }).update(data);
  }

  async delete(id) {
    await knex(this.tableName).where({ id }).del();
  }
}

module.exports = CoreDataMapper;