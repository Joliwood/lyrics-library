import CoreDatamapper from './coreDatamapper.js';

class Album extends CoreDatamapper {
  tableName = 'album';

  async findByArist(artistId) {
    const rows = await this.client.query.from(this.tableName).where({ artist_id: artistId });
    return rows;
  }
}

export default Album;
