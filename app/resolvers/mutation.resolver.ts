/* eslint-disable @typescript-eslint/naming-convention */
import { jwtDecode } from 'jwt-decode';

import type {
  Album, MutationResolvers,
} from '../../types/__generated_schemas__/graphql';

import { type ProfileJWT } from '#types';

const Mutation: MutationResolvers = {
  async addAlbum(_, args, { dataSources, userEncoded }) {
    const album = await dataSources
      .lyricsdb
      .albumDatamapper
      .createAlbum(args.input, userEncoded);
    return album;
  },

  async updateAlbum(_, args, { dataSources }) {
    const album = await dataSources
      .lyricsdb
      .albumDatamapper
      .update(args.id, args.input);
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
      cover, duration, lyrics, title,
    } = args.input;

    if (userEncoded == null) {
      throw new Error('You must be logged in to like a song');
    }

    const userDecoded = jwtDecode<ProfileJWT>(userEncoded);
    const artistId = userDecoded.id;

    const song = await dataSources
      .lyricsdb
      .songDatamapper
      .create({
        artist_id: artistId,
        cover,
        duration,
        lyrics,
        title,
      });

    return song;
  },

  async updateArtist(_, args, { dataSources }) {
    const artist = await dataSources
      .lyricsdb
      .artistDatamapper
      .update(args.id, args.input);
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
      .deleteMultipleAssociations('song_id', songIds);

    await dataSources
      .lyricsdb
      .songOnAlbumDatamapper
      .deleteMultipleAssociations('song_id', songIds);

    const songToDelete = await dataSources
      .lyricsdb
      .songDatamapper
      .deleteMultiple(songIds);

    return songToDelete;
  },

  async likeSong(_, args, { dataSources, userEncoded }) {
    if (userEncoded == null) {
      throw new Error('You must be logged in to like a song');
    }

    const userDecoded = jwtDecode<ProfileJWT>(userEncoded);

    const songId = args.id;
    const artistId = userDecoded.id;

    try {
      await dataSources
        .lyricsdb
        .artistLikeSongDatamapper
        .create({ song_id: songId, artist_id: artistId });

      return true;
    } catch (error) {
      throw new Error('You have already liked this song');
    }
  },

  async unlikeSong(_, args, { dataSources, userEncoded }) {
    if (userEncoded == null) {
      throw new Error('You must be logged in to unlike a song');
    }

    const userDecoded = jwtDecode<ProfileJWT>(userEncoded);

    const songId = args.id;
    const artistId = userDecoded.id;

    const result = await dataSources
      .lyricsdb
      .artistLikeSongDatamapper
      .unlikeSong(artistId, songId);

    if (!result) {
      throw new Error('You have not liked this song');
    }

    return true;
  },
};

export default Mutation;
