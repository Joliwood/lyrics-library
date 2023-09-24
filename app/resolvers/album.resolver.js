export default {
  async artist(parent, _, { dataSources }) {
    // Do not use parent.artist_id for exemple, so the query can be executed
    // from multiple nested queries
    const row = await dataSources.lyricsdb.artistDatamapper.idsLoader.load(parent.id);
    return row;
  },

  async songs(parent, _, { dataSources }) {
    const rows = await dataSources.lyricsdb.songDatamapper.findByAlbum(parent.id);
    return rows;
  },
};
