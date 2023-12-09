type ArtistLikeSongRow = {
  artist_id: number, song_id: number
};

export default {
  async albums(parent: any, _: any, { dataSources }: any) {
    const rows = await (
      dataSources
        .albumDatamapper
        .lyricsdb
        .findByArtist(parent.id)
    );
    return rows;
  },

  async favorites(parent: any, _: any, { dataSources }: any) {
    const row: ArtistLikeSongRow[] = await (
      dataSources
        .lyricsdb
        .artistLikeSongDatamapper
        .findByArtist(parent.id)
    );
    console.log('row', row);

    return row;
  },
};
