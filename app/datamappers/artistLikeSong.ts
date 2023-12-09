import CoreDatamapper from './coreDatamapper.js';
import type { ArtistLikeSongRow } from '../../types/index.d.ts';

class ArtistLikeSong extends CoreDatamapper {
  tableName = 'artist_like_song';

  async findByArtist(artist_id: number): Promise<ArtistLikeSongRow[]> {
    const rows: ArtistLikeSongRow[] = await (
      this.client.query
        .from(this.tableName)
        .where({ artist_id })
    );
    return rows;
  }

  async findBySong(song_id: number): Promise<ArtistLikeSongRow[]> {
    const rows: ArtistLikeSongRow[] = await (
      this.client.query
        .from(this.tableName)
        .where({ song_id })
    );
    return rows;
  }

  async countBySong(song_id: number): Promise<number> {
    const rows: ArtistLikeSongRow[] = await (
      this.client.query
        .from(this.tableName)
        .where({ song_id })
    );
    return rows.length;
  }
}

export default ArtistLikeSong;
