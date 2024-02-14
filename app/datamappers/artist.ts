import CoreDatamapper from './coreDatamapper';
import type { ArtistRow } from '../../types';

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
