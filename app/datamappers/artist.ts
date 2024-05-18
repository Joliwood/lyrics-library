import {
  type Artist,
  type ArtistUser,
} from '../../types/__generated_schemas__/graphql';

import { CoreDatamapper } from '#datamappers';

class ArtistDatamapper extends CoreDatamapper {
  async findBySong(songId: number) {
    const artist: Artist = await (
      this.client.query
        .from(this.tableName)
        .where({ id: songId })
        .first()
    );
    return artist;
  }

  async findByEmail(email: string) {
    const artist: ArtistUser = await (
      this.client.query
        .from(this.tableName)
        .where({ email })
        .first()
    );
    return artist;
  }

  async findByName(name: string) {
    const artist: ArtistUser = await (
      this.client.query
        .from(this.tableName)
        .where({ name })
        .first()
    );
    return artist;
  }
}

export default ArtistDatamapper;
