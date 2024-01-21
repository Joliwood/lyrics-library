import CoreDatamapper from './coreDatamapper.js';
import type { AlbumRow } from '../../types/index.d.ts';

class Album extends CoreDatamapper {
  tableName: string = 'album';

  async findByArtist(artistId: number): Promise<AlbumRow[]> {
    const rows: AlbumRow[] = await (
      this.client.query
        .from(this.tableName)
        .where({ artist_id: artistId })
    );
    return rows;
  }
}

export default Album;
