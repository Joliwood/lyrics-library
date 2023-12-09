import CoreDatamapper from './coreDatamapper.js';
import type { ArtistLikeSongRow } from '../../types/index.d.ts';

class ArtistLikeSong extends CoreDatamapper {
  tableName = 'artist_like_song';

  async findByArtist(artistId: number): Promise<ArtistLikeSongRow[]> {
    const rows: ArtistLikeSongRow[] = await (
      this.client.query
        .from(this.tableName)
        .where({ artist_id: artistId })
    );
    return rows;
  }

  async findBySong(songId: number): Promise<ArtistLikeSongRow[]> {
    const rows: ArtistLikeSongRow[] = await (
      this.client.query
        .from(this.tableName)
        .where({ song_id: songId })
    );
    return rows;
  }

  async countBySong(songId: number): Promise<number> {
    const rows: ArtistLikeSongRow[] = await (
      this.client.query
        .from(this.tableName)
        .where({ song_id: songId })
    );
    return rows.length;
  }
}

export default ArtistLikeSong;
