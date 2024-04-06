import type { AlbumResolvers } from '../../types/__generated_schemas__/graphql';

import { type GraphQLContext } from '#types';

const Album: AlbumResolvers<GraphQLContext> = {
  async artist(parent, _, { dataSources }) {
    // Do not use parent.artist_id for exemple, so the query can be executed
    // from multiple nested queries
    const artist = await (
      dataSources
        .lyricsdb
        .artistDatamapper
        .idsLoader
        .load(parent.id)
    );

    return artist;
  },

  async songs(parent, _, { dataSources }) {
    const songs = await (
      dataSources
        .lyricsdb
        .songDatamapper
        .findByAlbum(parent.id)
    );
    return songs;
  },
};

export default Album;
