import CoreDatamapper from './coreDatamapper.js';
import client from '../db/pg.js';

class Album extends CoreDatamapper {
  tableName = 'album';

  async findByArist(artistId) {
    const preparedQuery = {
      text: `
        SELECT *
        FROM "${this.tableName}"
        WHERE "artist_id" = $1`,
      values: [artistId],
    };

    const result = await this.client.query(preparedQuery);
    return result.rows;
  }
}

export default new Album(client);
