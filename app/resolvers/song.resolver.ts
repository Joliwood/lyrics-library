import { jwtDecode } from 'jwt-decode';

import type {
  SongResolvers,
  Artist,
  ArtistLikeSong,
  SongOnAlbum,
} from '../../types/__generated_schemas__/graphql';

import { type ProfileJWT } from '#types';

const Song: SongResolvers = {
  // async album(parent, _, { dataSources }) {
  //   // We can replace findByPk by an idLoader,
  //   // so it doesn't execute one query by album, with first().
  //   // Instead, it will make one request with all ids in
  //   // 3150 / 2300ms -> 950 / 750ms -> +300% faster
  //   const rows = await dataSources.lyricsdb.albumDatamapper.idsLoader.load(parent.album_id);
  //   return rows;
  // },

  async artist(parent, _, { dataSources }) {
    const artist: Artist = await (
      dataSources
        .lyricsdb
        .artistDatamapper
        .findBySong(parent.id)
    );
    return artist;
  },

  async like(parent, _, { dataSources }) {
    const likes: ArtistLikeSong[] = await (
      dataSources
        .lyricsdb
        .artistLikeSongDatamapper
        .findBySong(parent.id)
    );
    return likes;
  },

  async nbLike(parent, _, { dataSources }) {
    const nbLike: number = await (
      dataSources
        .lyricsdb
        .artistLikeSongDatamapper
        .countBySong(parent.id)
    );
    return nbLike;
  },

  async songOnAlbum(parent, _, { dataSources }) {
    const songOnAlbum: SongOnAlbum[] = await (
      dataSources
        .lyricsdb
        .songOnAlbumDatamapper
        .findBySong(parent.id)
    );
    return songOnAlbum;
  },

  async isLiked(parent, _, { dataSources, userEncoded }) {
    if (!userEncoded) {
      return null;
    }

    const userDecoded = jwtDecode<ProfileJWT>(userEncoded);
    const userId = userDecoded.id;
    const songId = parent.id;

    const isLiked: boolean = await (
      dataSources
        .lyricsdb
        .artistLikeSongDatamapper
        .isLiked({ songId, userId })
    );
    return isLiked;
  },
};

export default Song;
