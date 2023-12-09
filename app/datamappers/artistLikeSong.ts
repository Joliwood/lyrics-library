import CoreDatamapper from './coreDatamapper.js';

class ArtistLikeSong extends CoreDatamapper {
  tableName = 'artist_like_song';

  async findByArtist(artist_id: number): Promise<number[]> {
    const rows = await this.client.query.from(this.tableName).where({ artist_id });
    return rows;
  }
}

export default ArtistLikeSong;
