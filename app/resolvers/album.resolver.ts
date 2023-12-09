import type { SongRow } from '../../types/index.d.ts';

export default {
  async artist(parent: any, _: any, { dataSources }: any): Promise<SongRow[]> {
    // Do not use parent.artist_id for exemple, so the query can be executed
    // from multiple nested queries
    const row: SongRow[] = await (
      dataSources
        .lyricsdb
        .artistDatamapper
        .idsLoader
        .load(parent.id)
    );
    return row;
  },

  async songs(parent: any, _: any, { dataSources }: any): Promise<SongRow[]> {
    const rows: SongRow[] = await (
      dataSources
        .lyricsdb
        .songDatamapper
        .findByAlbum(parent.id)
    );
    return rows;
  },
};
