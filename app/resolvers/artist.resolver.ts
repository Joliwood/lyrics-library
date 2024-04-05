import type { ArtistResolvers } from '../../types/__generated_schemas__/graphql';

import { type GraphQLContext } from '#types';

const Artist: ArtistResolvers<GraphQLContext> = {
  async albums(parent, _, { dataSources }) {
    const rows = await (
      dataSources
        .lyricsdb
        .albumDatamapper
        .findByArtist(parent.id)
    );
    return rows;
  },

  // ArtistLikeSong relation
  async favorites(parent, _, { dataSources }) {
    const rows = await (
      dataSources
        .lyricsdb
        .artistLikeSongDatamapper
        .findByArtist(parent.id)
    );
    return rows;
  },

  async songs(parent, _, { dataSources }) {
    const rows = await (
      dataSources
        .lyricsdb
        .songDatamapper
        .findByArtist(parent.id)
    );
    return rows;
  },
};

export default Artist;
