import CoreDatamapper from './coreDatamapper.js';
import type { AlbumRows } from '../../types/index.d.ts';

class Album extends CoreDatamapper {
  tableName = 'album';

  async findByArtist(artistId: number): Promise<AlbumRows[]> {
    const rows: AlbumRows[] = await (
      this.client.query
        .from(this.tableName)
        .where({ artist_id: artistId })
    );
    return rows;
  }
}

export default Album;
