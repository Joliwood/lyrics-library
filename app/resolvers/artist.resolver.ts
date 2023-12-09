import type { AlbumRow, ArtistLikeSongRow } from '../../types/index.d.ts';

export default {
  async albums(parent: any, _: any, { dataSources }: any) {
    const rows: AlbumRow[] = await (
      dataSources
        .lyricsdb
        .albumDatamapper
        .findByArtist(parent.id)
    );
    return rows;
  },

  // ArtistLikeSong relation
  async favorites(parent: any, _: any, { dataSources }: any) {
    const rows: ArtistLikeSongRow[] = await (
      dataSources
        .lyricsdb
        .artistLikeSongDatamapper
        .findByArtist(parent.id)
    );
    return rows;
  },

  async songs(parent: any, _: any, { dataSources }: any) {
    const rows = await (
      dataSources
        .lyricsdb
        .songDatamapper
        .findByArtist(parent.id)
    );
    return rows;
  },
};
