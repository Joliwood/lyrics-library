import type { ArtistLikeSongRow } from '../../types/index.d.ts';

export default {
  async albums(parent: any, _: any, { dataSources }: any) {
    //! problem between
    const rows = await (
      dataSources
        .lyricsdb
        .albumDatamapper
        .findByArtist(parent.id)
    );
    //! problem between
    return rows;
  },

  async favorites(parent: any, _: any, { dataSources }: any) {
    const rows: ArtistLikeSongRow[] = await (
      dataSources
        .lyricsdb
        .artistLikeSongDatamapper
        .findByArtist(parent.id)
    );
    return rows;
  },
};
