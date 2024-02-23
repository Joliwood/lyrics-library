import { CoreDatamapper } from '#datamappers';
import type { ArtistRow } from '#types';

class ArtistDatamapper extends CoreDatamapper {
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

export default ArtistDatamapper;
