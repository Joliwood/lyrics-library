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
    const {
      albumId,
      input,
    } = args;
    const {
      cover,
      release_year,
      title,
      songIds,
    } = input;

    const artistId = checkAuthentification({ userEncoded });

    if (artistId == null) {
      throw new GraphQLError('You must be logged in to update an album');
    }

    const album = await dataSources
      .lyricsdb
      .albumDatamapper
      .findByPk<Album>(albumId);

    const { artist_id: albumArtistId } = album;

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

    const albumUpdated = await dataSources
      .lyricsdb
      .albumDatamapper
      .update<typeof args['input'], Album>(albumId, { cover, release_year, title });

    return albumUpdated;
  },

  async deleteAlbum(_, args, { dataSources }) {
    await dataSources
      .lyricsdb
      .songOnAlbumDatamapper
      .deleteByAlbum([args.id]);

    // if (!songOnAlbumsToDelete) {
    //   throw new GraphQLError('Could not delete the songs on the album');
    // }

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
      release_year,
    } = args.input;

    const artistId = checkAuthentification({ userEncoded });

    if (artistId == null) {
      throw new Error('You must be logged in to add a song');
    }

    const song = await dataSources
      .lyricsdb
      .songDatamapper
      .create<typeof args['input'], Song>(
      {
        artist_id: artistId,
        cover,
        duration,
        lyrics,
        title,
        release_year,
      },
    );

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

  async deleteArtist(_, __, { dataSources, userEncoded }) {
    const artistId = checkAuthentification({ userEncoded });

    if (artistId == null) {
      throw new Error('You must be logged in to like a song');
    }

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

  async updateSong(_, args, { dataSources, userEncoded }) {
    const { songId, input } = args;

    const artistId = checkAuthentification({ userEncoded });

    if (artistId == null) {
      throw new Error('You must be logged in to update a song');
    }

    const song = await dataSources
      .lyricsdb
      .songDatamapper
      .findByPk<Song>(songId);

    const { artist_id: songArtistId } = song;

    if (songArtistId !== artistId) {
      throw new GraphQLError('You can only update your own songs');
    }

    const songUpdated = await dataSources
      .lyricsdb
      .songDatamapper
      .update<typeof input, Song>(songId, args.input);

    return songUpdated;
  },

  async addArtist(_, args, { dataSources }) {
    const {
      country,
      email,
      name,
      password,
      picture,
    } = args.input;

    const existingArtistName = await dataSources
      .lyricsdb
      .artistDatamapper
      .findByName(name);

    if (existingArtistName) {
      throw new GraphQLError('An artist with this name already exists', {
        extensions: { code: 'ARTIST_NAME_ALREADY_EXISTS' },
      });
    }

    const existingArtistEmail = await dataSources
      .lyricsdb
      .artistDatamapper
      .findByEmail(email);

    if (existingArtistEmail) {
      throw new GraphQLError('An artist with this email already exists', {
        extensions: { code: 'ARTIST_EMAIL_ALREADY_EXISTS' },
      });
    }

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
