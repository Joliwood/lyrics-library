import CoreDatamapper from './coreDatamapper.js';
import type { SongRow } from '../../types/index.d.ts';

class Song extends CoreDatamapper {
  tableName = 'song';

  async findByAlbum(albumId: number): Promise<SongRow[]> {
    const rows: SongRow[] = await (
      this.client.query
        .from(this.tableName)
        .where({ id: albumId })
    );
    return rows;
  }

  async findByArtist(artistId: number): Promise<SongRow[]> {
    const rows: SongRow[] = await (
      this.client.query
        .from(this.tableName)
        .where({ artist_id: artistId })
    );
    return rows;
  }
}

export default Song;
