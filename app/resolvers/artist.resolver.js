export default {
  async albums(parent, _, { dataSources }) {
    const rows = await dataSources.lyricsdb.albumDatamapper.findByArist(parent.id);
    return rows;
  },
};
