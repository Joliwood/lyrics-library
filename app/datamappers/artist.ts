import type { Artist } from '../../types/__generated_schemas__/graphql';

import { CoreDatamapper } from '#datamappers';

class ArtistDatamapper extends CoreDatamapper {
  tableName = 'artist';

  async findBySong(songId: number): Promise<Artist> {
    const artist: Artist = await (
      this.client.query
        .from(this.tableName)
        .where({ id: songId })
        .first()
    );
    return artist;
  }
}

export default ArtistDatamapper;
