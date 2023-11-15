export default {
  async albums(parent, _, { dataSources }) {
    const rows = await dataSources.lyricsdb.albumDatamapper.findByArtist(parent.id);
    return rows;
  },
};
