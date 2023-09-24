export default {
  async albums(_, __, { dataSources }) {
    const rows = await dataSources.lyricsdb.albumDatamapper.findAll();
    return rows;
  },

  async album(_, args, { dataSources }) {
    // All findByPk can be replace here by idsLoader to use same method most of the time
    // but for single query, it will not improve speed response
    const row = await dataSources.lyricsdb.albumDatamapper.idsLoader.load(args.id);
    return row;
  },

  async songs(_, __, { dataSources }) {
    const rows = await dataSources.lyricsdb.songDatamapper.findAll();
    return rows;
  },

  async song(_, args, { dataSources }) {
    const row = await dataSources.lyricsdb.songDatamapper.idsLoader.load(args.id);
    return row;
  },

  async artists(_, __, { dataSources }) {
    const rows = await dataSources.lyricsdb.artistDatamapper.findAll();
    return rows;
  },

  async artist(_, args, { dataSources }) {
    const row = await dataSources.lyricsdb.artistDatamapper.idsLoader.load(args.id);
    return row;
  },
};
