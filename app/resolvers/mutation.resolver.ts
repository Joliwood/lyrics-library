/* eslint-disable @typescript-eslint/naming-convention */

import { GraphQLError } from 'graphql';

import {
  type Artist,
  type Album,
  type ArtistLikeSong,
  type MutationResolvers,
  type Song,
  type SongOnAlbum,
  type ArtistCreateInput,
  // type SongOnAlbum,
} from '../../types/__generated_schemas__/graphql';

import { checkAuthentification } from '#utils';
import { type GraphQLContext } from '#types';
import { AssociationsToDelete } from '#enums';

const Mutation: MutationResolvers<GraphQLContext> = {
  async addAlbum(_, args, { dataSources, userEncoded }) {
    const { input } = args;

    const album = await dataSources
      .lyricsdb
      .albumDatamapper
      .createAlbum(input, userEncoded);

    return album;
  },

  async updateAlbum(_, args, { dataSources, userEncoded }) {
    const artistId = checkAuthentification({ userEncoded });
    const {
      albumId,
      albumArtistId,
      input,
    } = args;

    const {
      cover,
      release_year,
      title,
      songIds,
    } = input;

    if (artistId == null) {
      throw new GraphQLError('You must be logged in to update an album');
    }

    if (albumArtistId !== artistId) {
      throw new GraphQLError('You can only update your own albums');
    }

    if (songIds != null) {
      await dataSources
        .lyricsdb
        .songOnAlbumDatamapper
        .deleteByAlbum([albumId]);

      if (songIds.length > 0) {
        // eslint-disable-next-line no-restricted-syntax
        for await (const [index, songId] of songIds.entries()) {
          await dataSources
            .lyricsdb
            .songOnAlbumDatamapper
            .create<SongOnAlbum, SongOnAlbum>({
            // TODO - Change the songId and remove the InputMaybe
            song_id: songId as number,
            album_id: albumId,
            position: index + 1,
          });
        }
      }
    }

    const album = await dataSources
      .lyricsdb
      .albumDatamapper
      .update<typeof args['input'], Album>(albumId, { cover, release_year, title });

    return album;
  },

  async deleteAlbum(_, args, { dataSources }) {
    const result = await dataSources
      .lyricsdb
      .albumDatamapper
      .delete(args.id);
    return result;
  },

  async addSong(_, args, { dataSources, userEncoded }) {
    const {
      cover,
      duration,
      lyrics,
      title,
    } = args.input;

    const artistId = checkAuthentification({ userEncoded });

    if (artistId == null) {
      throw new Error('You must be logged in to add a song');
    }

    const song = await dataSources
      .lyricsdb
      .songDatamapper
      .create<typeof args['input'], Song>({
      artist_id: artistId,
      cover,
      duration,
      lyrics,
      title,
    });

    return song;
  },

  async updateArtist(_, args, { dataSources, userEncoded }) {
    const artistId = checkAuthentification({ userEncoded });

    if (artistId == null) {
      throw new Error('You must be logged in to update an artist');
    }

    const artist = await dataSources
      .lyricsdb
      .artistDatamapper
      .update<typeof args['input'], Artist>(artistId, args.input);
    return artist;
  },

  async deleteArtist(_, args, { dataSources }) {
    const artistId = args.id;

    // Find all albums to delete with the artist id
    const albums = await dataSources
      .lyricsdb
      .albumDatamapper
      .findByArtist(artistId);

    // With all album ids, we can find all songs to delete
    const albumIds: Album['id'][] = albums.map((album: Album) => album.id);

    const songs = await dataSources
      .lyricsdb
      .songDatamapper
      .findByArtist(artistId);

    const songIds = songs.map((song: any) => song.id);

    await dataSources
      .lyricsdb
      .songOnAlbumDatamapper
      .deleteByAlbum(albumIds);

    await dataSources
      .lyricsdb
      .artistLikeSongDatamapper
      .deleteByArtist(artistId);

    await dataSources
      .lyricsdb
      .artistLikeSongDatamapper
      .deleteBySongs(songIds);

    await dataSources
      .lyricsdb
      .albumDatamapper
      .deleteMultiple(albumIds);

    await dataSources
      .lyricsdb
      .songDatamapper
      .deleteMultiple(songIds);

    const artistToDelete = await dataSources
      .lyricsdb
      .artistDatamapper
      .delete(artistId);

    return artistToDelete;
  },

  async deleteSongs(_, args, { dataSources }) {
    const songIds = args.ids;

    await dataSources
      .lyricsdb
      .artistLikeSongDatamapper
      .deleteMultipleAssociations(AssociationsToDelete.SongId, songIds);

    await dataSources
      .lyricsdb
      .songOnAlbumDatamapper
      .deleteMultipleAssociations(AssociationsToDelete.SongId, songIds);

    const songToDelete = await dataSources
      .lyricsdb
      .songDatamapper
      .deleteMultiple(songIds);

    return songToDelete;
  },

  async likeSong(_, args, { dataSources, userEncoded }) {
    const artistId = checkAuthentification({ userEncoded });

    if (artistId == null) {
      throw new Error('You must be logged in to like a song');
    }

    const songId = args.id;

    try {
      await dataSources
        .lyricsdb
        .artistLikeSongDatamapper
        .create<ArtistLikeSong, ArtistLikeSong>({ song_id: songId, artist_id: artistId });

      return true;
    } catch (error) {
      throw new Error('You have already liked this song');
    }
  },

  async unlikeSong(_, args, { dataSources, userEncoded }) {
    const artistId = checkAuthentification({ userEncoded });

    if (artistId == null) {
      throw new Error('You must be logged in to unlike a song');
    }

    const songId = args.id;

    const result = await dataSources
      .lyricsdb
      .artistLikeSongDatamapper
      .unlikeSong(artistId, songId);

    if (!result) {
      throw new Error('You have not liked this song');
    }

    return true;
  },

  async updateSong(_, args, { dataSources }) {
    const { songId, input } = args;

    const song = await dataSources
      .lyricsdb
      .songDatamapper
      .update<typeof input, Song>(songId, args.input);

    return song;
  },

  async addArtist(_, args, { dataSources }) {
    const {
      country,
      email,
      name,
      password,
      picture,
    } = args.input;

    const artist = await dataSources
      .lyricsdb
      .artistDatamapper
      .create<ArtistCreateInput, Artist>({
      country,
      email,
      name,
      password,
      picture,
    });

    return artist;
  },
};

export default Mutation;
