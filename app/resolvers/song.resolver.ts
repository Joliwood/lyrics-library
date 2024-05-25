import type {
  SongResolvers,
} from '../../types/__generated_schemas__/graphql';

import { checkAuthentification } from '#utils';
import { type GraphQLContext } from '#types';

const Song: SongResolvers<GraphQLContext> = {
  // async album(parent, _, { dataSources }) {
  //   // We can replace findByPk by an idLoader,
  //   // so it doesn't execute one query by album, with first().
  //   // Instead, it will make one request with all ids in
  //   // 3150 / 2300ms -> 950 / 750ms -> +300% faster
  //   const rows = await dataSources.lyricsdb.albumDatamapper.idsLoader.load(parent.album_id);
  //   return rows;
  // },

  async artist(parent, _, { dataSources }) {
    if (parent.artist_id == null) {
      return null;
    }

    const artist = await (
      dataSources
        .lyricsdb
        .artistDatamapper
        .findBySong(parent.artist_id)
    );
    return artist;
  },

  async like(parent, _, { dataSources }) {
    const likes = await (
      dataSources
        .lyricsdb
        .artistLikeSongDatamapper
        .findBySong(parent.id)
    );
    return likes;
  },

  async nbLike(parent, _, { dataSources }) {
    const nbLike = await (
      dataSources
        .lyricsdb
        .artistLikeSongDatamapper
        .countBySong(parent.id)
    );
    return nbLike;
  },

  async songOnAlbum(parent, _, { dataSources }) {
    const songOnAlbum = await (
      dataSources
        .lyricsdb
        .songOnAlbumDatamapper
        .findBySong(parent.id)
    );
    return songOnAlbum;
  },

  async isLiked(parent, _, { dataSources, userEncoded }) {
    const userId = checkAuthentification({ userEncoded });

    if (userId == null) {
      return null;
    }

    const songId = parent.id;

    const isLiked = await (
      dataSources
        .lyricsdb
        .artistLikeSongDatamapper
        .isLiked({ songId, userId })
    );
    return isLiked;
  },
};

export default Song;
