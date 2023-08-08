import albumDatamapper from '../datamappers/album.js';
// import songDatamapper from '../datamappers/song.js';
import artistDatamapper from '../datamappers/artist.js';

export default {

  Query: {

    async albums() {
      const rows = await albumDatamapper.findAll();
      return rows;
    },

  },

  Album: {

     async artist(parent) {
      const row = await artistDatamapper.findByPk(parent.artist_id);
      return row;
    }

  }
};
