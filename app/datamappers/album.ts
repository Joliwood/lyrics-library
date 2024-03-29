import { CoreDatamapper } from '#datamappers';
import type { Album } from '../../types/__generated_schemas__/graphql';

class AlbumDatamapper extends CoreDatamapper {
  tableName: string = 'album';

  async findByArtist(artistId: number): Promise<Album[]> {
    const albums: Album[] = await (
      this.client.query
        .from(this.tableName)
        .where({ artist_id: artistId })
    );
    return albums;
  }
}

export default AlbumDatamapper;
