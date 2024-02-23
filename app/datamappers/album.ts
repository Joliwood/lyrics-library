import { CoreDatamapper } from '#datamappers';
import type { AlbumRow } from '#types';

class AlbumDatamapper extends CoreDatamapper {
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

export default AlbumDatamapper;
