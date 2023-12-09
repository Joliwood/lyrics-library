import CoreDatamapper from './coreDatamapper.js';
import type { SongRows } from '../../types/index.d.ts';

class Song extends CoreDatamapper {
  tableName = 'song';

  async findByAlbum(albumId: number) {
    const rows: SongRows[] = await (
      this.client.query
        .from(this.tableName)
        .where({ album_id: albumId })
    );
    return rows;
  }

  async findByArtist(artistId: number) {
    const rows: SongRows[] = await (
      this.client.query
        .from(this.tableName)
        .where({ artist_id: artistId })
    );
    console.log(rows);

    return rows;
  }
}

export default Song;
