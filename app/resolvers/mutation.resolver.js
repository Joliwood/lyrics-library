export default {
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

  async addSong(_, args, { dataSources }) {
    const row = await dataSources.lyricsdb.songDatamapper.create(args.input);
    return row;
  },
};
