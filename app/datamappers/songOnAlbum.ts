import CoreDatamapper from './coreDatamapper';
import type { SongOnAlbumRow } from '../../types';

class SongOnAlbum extends CoreDatamapper {
  tableName = 'song_on_album';

  async findBySong(songId: number): Promise<SongOnAlbumRow[]> {
    const rows: SongOnAlbumRow[] = await (
      this.client.query
        .from(this.tableName)
        .where({ song_id: songId })
    );
    return rows;
  }
}

export default SongOnAlbum;
