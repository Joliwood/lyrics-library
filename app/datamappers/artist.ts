import CoreDatamapper from './coreDatamapper.js';
import type { ArtistRow } from '../../types/index.d.ts';

class Artist extends CoreDatamapper {
  tableName = 'artist';

  async findBySong(songId: number): Promise<ArtistRow> {
    const artist: ArtistRow = await (
      this.client.query
        .from(this.tableName)
        .where({ id: songId })
        .first()
    );
    return artist;
  }
}

export default Artist;
