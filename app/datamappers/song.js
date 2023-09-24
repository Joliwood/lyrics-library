import CoreDatamapper from './coreDatamapper.js';

class Song extends CoreDatamapper {
  tableName = 'song';

  async findByAlbum(albumId) {
    const rows = await this.client.query.from(this.tableName).where({ album_id: albumId });
    return rows;
  }
}

export default Song;
