import CoreDatamapper from './coreDatamapper.js';

class Artist extends CoreDatamapper {
  tableName = 'artist';

  async findByazaz(artistId) {
    console.log('we are here');
    const rows = await this.client.query.from(this.tableName).where({ artist_id: artistId });

    return rows;
  }
}

export default Artist;
