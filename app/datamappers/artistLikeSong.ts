import CoreDatamapper from './coreDatamapper.js';

class ArtistLikeSong extends CoreDatamapper {
  tableName = 'artist_like_song';

  async findByArtist(artistId: number): Promise<number[]> {
    const rows = await this.client.query.from(this.tableName).where({ artist_id: artistId });
    console.log(rows);
    const songIds: number[] = rows.map((row: any) => row.song_id);
    return songIds;
  }
}

export default ArtistLikeSong;
