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
      const row = await dataSources.lyricsdb.artistDatamapper.findByPk(parent.artist_id);
      return row;
    },

  },

  Artist: {

    async albums(parent, _, { dataSources }) {
      const rows = await dataSources.lyricsdb.albumDatamapper.findByArist(parent.id);
      return rows;
    },

  },
};
