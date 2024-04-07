import { GraphQLError } from 'graphql';

import type { Album, AlbumCreateInput } from '../../types/__generated_schemas__/graphql';

import { CoreDatamapper } from '#datamappers';
import { checkAuthentification } from '#utils';
import { TableNamesEnum } from '#enums';

class AlbumDatamapper extends CoreDatamapper {
  async findByArtist(artistId: number): Promise<Album[]> {
    const albums: Album[] = await
    this.client.query
      .from(this.tableName)
      .where({ artist_id: artistId });

    return albums;
  }

  async createAlbum(input: AlbumCreateInput, userEncoded: string | undefined): Promise<Album> {
    const {
      cover,
      release_year: ReleaseYear,
      songIds,
      title,
    } = input;
    const artistId = checkAuthentification({ userEncoded });

    const albums = await this.client.query
      .from(this.tableName)
      .insert({
        title,
        artist_id: artistId,
        cover,
        release_year: ReleaseYear,
      })
      .returning<Album[]>('*');

    const albumCreated = albums[0];

    const songInsertions = songIds.map(async (songId: number, index: number) => {
      const songOnAlbum = await this.client.query
        .from(TableNamesEnum.SONG_ON_ALBUM)
        .insert({ album_id: albumCreated.id, song_id: songId, position: index + 1 });

      return [songOnAlbum];
    });

    const songOnAlbums = await Promise.all(songInsertions);

    if (songOnAlbums.length !== songIds.length) {
      await this.client.query
        .from(this.tableName)
        .where({ id: albumCreated.id })
        .del();

      throw new GraphQLError('Error creating album');
    }
    return albumCreated;
  }
}

export default AlbumDatamapper;
