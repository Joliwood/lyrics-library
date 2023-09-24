export default {

  Query: {
    async albums(_, __, { dataSources }) {
      const rows = await dataSources.lyricsdb.albumDatamapper.findAll();
      return rows;
    },

    async album(_, args, { dataSources }) {
      const row = await dataSources.lyricsdb.albumDatamapper.findByPk(args.id);
      return row;
    },

    async songs(_, __, { dataSources }) {
      const rows = await dataSources.lyricsdb.songDatamapper.findAll();
      return rows;
    },

    async song(_, args, { dataSources }) {
      const row = await dataSources.lyricsdb.songDatamapper.findByPk(args.id);
      return row;
    },

    async artists(_, __, { dataSources }) {
      const rows = await dataSources.lyricsdb.artistDatamapper.findAll();
      return rows;
    },

    async artist(_, args, { dataSources }) {
      const row = await dataSources.lyricsdb.artistDatamapper.findByPk(args.id);
      return row;
    },
  },

  Mutation: {

    async addAlbum(_, args, { dataSources }) {
      const row = await dataSources.lyricsdb.albumDatamapper.create(args.input);
      return row;
    },
    async updateAlbum(_, args, { dataSources }) {
      const row = await dataSources.lyricsdb.albumDatamapper.update(args.id, args.input);
      return row;
    },
    async deleteAlbum(_, args, { dataSources }) {
      const result = await dataSources.lyricsdb.albumDatamapper.delete(args.id);
      return result;
    },

  },

  Album: {
    async artist(parent, _, { dataSources }) {
      // Do not use parent.artist_id for exemple, so the query can be executed
      // from multiple nested queries
      const row = await dataSources.lyricsdb.artistDatamapper.findByPk(parent.id);
      return row;
    },

    async songs(parent, _, { dataSources }) {
      //! Not sure right now
      // Every findByPk can be replaced by an idsLoader, it searchs on all ids array from album ids
      // With with findByPk, it searchs on all irows of the table, it takes more time
      const rows = await dataSources.lyricsdb.songDatamapper.findByAlbum(parent.id);
      return rows;
    },
  },

  Artist: {
    async albums(parent, _, { dataSources }) {
      const rows = await dataSources.lyricsdb.albumDatamapper.findByArist(parent.id);
      return rows;
    },
  },
};
