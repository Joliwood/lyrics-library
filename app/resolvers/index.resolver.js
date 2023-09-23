export default {

  Query: {

    async albums(_, __, { dataSources }) {
      const rows = await dataSources.origin.albumDatamapper.findAll();
      return rows;
    },

    async album(_, args, { dataSources }) {
      const row = await dataSources.origin.albumDatamapper.findByPk(args.id);
      return row;
    },

    async songs(_, __, { dataSources }) {
      const row = await dataSources.origin.songDatamapper.findAll();
      return row;
    },

    async song(_, args, { dataSources }) {
      const row = await dataSources.origin.songDatamapper.findByPk(args.id);
      return row;
    },

  },

  Mutation: {

    async addAlbum(_, args, { dataSources }) {
      const row = await dataSources.origin.albumDatamapper.create(args.input);
      return row;
    },
    async updateAlbum(_, args, { dataSources }) {
      const row = await dataSources.origin.albumDatamapper.update(args.id, args.input);
      return row;
    },
    async deleteAlbum(_, args, { dataSources }) {
      const result = await dataSources.origin.albumDatamapper.delete(args.id);
      return result;
    },

  },

  Album: {

    async artist(parent, _, { dataSources }) {
      const row = await dataSources.origin.artistDatamapper.findByPk(parent.artist_id);
      return row;
    },

  },

  Artist: {

    async albums(parent, _, { dataSources }) {
      const rows = await dataSources.origin.albumDatamapper.findByArist(parent.id);
      return rows;
    },

  },
};
