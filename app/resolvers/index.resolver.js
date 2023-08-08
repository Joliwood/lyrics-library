import Album from './album.resolver.js';
import Artist from './artist.resolver.js';
import Song from './song.resolver.js';
import songsDatamapper from '../datamappers/song.js';

export default {
  // Album,
  // Artist,
  // Song,

  Query: {
    async songs() {
      const rows = await songsDatamapper.findAll();
      return rows;
    }
  }
};
