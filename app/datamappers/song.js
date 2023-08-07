import CoreDatamapper from './coreDatamapper.js';
import client from '../db/pg.js';

class Song extends CoreDatamapper {
  tableName = 'song';

  async findAll() {
    const preparedQuery = `SELECT * FROM "${this.tableName}"`;

    const result = await this.client.query(preparedQuery);

    return result.rows;
  };

}

export default new Song(client);
