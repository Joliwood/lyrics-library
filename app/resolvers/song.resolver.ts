export default {
  // async album(parent, _, { dataSources }) {
  //   // We can replace findByPk by an idLoader,
  //   // so it doesn't execute one query by album, with first().
  //   // Instead, it will make one request with all ids in
  //   // 3150 / 2300ms -> 950 / 750ms -> +300% faster
  //   const rows = await dataSources.lyricsdb.albumDatamapper.idsLoader.load(parent.album_id);
  //   return rows;
  // },

  async like(parent: any, _: any, { dataSources }: any) {
    const rows = await (
      dataSources
        .lyricsdb
        .artistLikeSongDatamapper
        .findBySong(parent.id)
    );
    return rows;
  },

  async nbLike(parent: any, _: any, { dataSources }: any): Promise<number> {
    const count: number = await (
      dataSources
        .lyricsdb
        .artistLikeSongDatamapper
        .countBySong(parent.id)
    );
    return count;
  },
};
