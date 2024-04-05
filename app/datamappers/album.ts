import type { Album } from '../../types/__generated_schemas__/graphql';

import { CoreDatamapper } from '#datamappers';
import { checkAuthentification } from '#utils';

class AlbumDatamapper extends CoreDatamapper {
  async findByArtist(artistId: number): Promise<Album[]> {
    const albums: Album[] = await
    this.client.query
      .from(this.tableName)
      .where({ artist_id: artistId });

    return albums;
  }

  async createAlbum(input: any, userEncoded: string | undefined): Promise<Album> {
    const {
      cover,
      release_year: ReleaseYear,
      songIds,
      title,
    } = input;
    const artistId = checkAuthentification({ userEncoded });

    const albums = await
    this.client.query
      .from(this.tableName)
      .insert({
        title,
        artist_id: artistId,
        cover,
        release_year: ReleaseYear,
      })
      .returning<Album[]>('*');

    const albumCreated = albums[0];

    songIds.forEach(async (songId: number[], index: number) => {
      this.client.query
        .from('song_on_album')
        .insert({ album_id: albumCreated.id, song_id: songId, position: index + 1 });
    });
    return albumCreated;
  }
}

export default AlbumDatamapper;
