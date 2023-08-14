import albumDatamapper from '../datamappers/album.js';
import songDatamapper from '../datamappers/song.js';
import artistDatamapper from '../datamappers/artist.js';

export default {

  Query: {

    async albums() {
      const rows = await albumDatamapper.findAll();
      return rows;
    },

    async album(_, args) {
      const row = await albumDatamapper.findByPk(args.id);
      return row;
    },

    async songs() {
      const row = await songDatamapper.findAll();
      return row;
    },

    async song(_, args) {
      const row = await songDatamapper.findByPk(args.id);
      return row;
    },

  },

  Mutation: {

    async addAlbum(_, args) {
      const row = await albumDatamapper.create(args.input);
      return row;
    },
    async updateAlbum(_, args) {
      const row = await albumDatamapper.update(args.id, args.input);
      return row;
    },
    async deleteAlbum(_, args) {
      const result = await albumDatamapper.delete(args.id);
      return result;
    }

  },

  Album: {

    async artist(parent) {
      const row = await artistDatamapper.findByPk(parent.artist_id);
      return row;
    }

  },

  Artist: {

    async albums(parent) {
      const rows = await albumDatamapper.findByArist(parent.id);
      return rows;
    }

  }
};
