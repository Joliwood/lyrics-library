export default {
  async albums(parent, _, { dataSources }) {
    const rows = await (
      dataSources
        .lyricsdb
        .albumDatamapper
        .findByArtist(parent.id)
    );
    return rows;
  },

  async favorites(parent, _, { dataSources }) {
    const row = await (
      dataSources
        .lyricsdb
        .artistLikeSongDatamapper
        .findByArtist(parent.id)
    );
    return row;
  },
};
