// import type { AlbumRow, SongRow } from '#types';
import type {
  Album, MutationResolvers, Song, SongOnAlbum,
} from '../../types/__generated_schemas__/graphql';

const Mutation: MutationResolvers = {
  async addAlbum(_, args, { dataSources }) {
    const row = await dataSources
      .lyricsdb
      .albumDatamapper
      .create(args.input);
    return row;
  },

  async updateAlbum(_, args, { dataSources }) {
    const row = await dataSources
      .lyricsdb
      .albumDatamapper
      .update(args.id, args.input);
    return row;
  },

  async deleteAlbum(_, args, { dataSources }) {
    const result = await dataSources
      .lyricsdb
      .albumDatamapper
      .delete(args.id);
    return result;
  },

  async addSong(_, args, { dataSources }) {
    const row = await dataSources
      .lyricsdb
      .songDatamapper
      .create(args.input);
    return row;
  },

  async updateArtist(_, args, { dataSources }) {
    const row = await dataSources
      .lyricsdb
      .artistDatamapper
      .update(args.id, args.input);
    return row;
  },

  async deleteArtist(_, args, { dataSources }) {
    // Find all albums to delete with the artist id
    const albums = await dataSources
      .lyricsdb
      .albumDatamapper
      .findByArtist(args.id);

    // With all album ids, we can find all songs to delete
    const albumIds: Album['id'][] = albums.map((album: Album) => album.id);

    const songOnAlbumIds = await Promise.all(
      albumIds.map(async (albumId) => {
        const rows: SongOnAlbum[] = await dataSources
          .lyricsdb
          .songOnAlbumDatamapper
          .findByAlbum(albumId);
        return rows.map((row: SongOnAlbum) => row.album_id);
      }),
    ).then((result) => result.flat());

    // const songOnAlbumIds = songOnAlbumIdsToMerge.flat();

    console.log('songOnAlbumIdsToMerge : ', songOnAlbumIds);

    // const songOnAlbumIds: number[] = songOnAlbums.flat();

    // const songOnAlbumIds: number[] = songOnAlbums.flatMap(
    //   (albumSongs) => albumSongs.map((albumSong) => albumSong.album_id),
    // );

    // const songOnAlbumIds: number[] = (await Promise.all(
    //   albumIds.map(
    //     async (albumId) => (
    //       await dataSources.lyricsdb.songOnAlbumDatamapper.findByAlbum(albumId)).map(
    //       (song: any) => song.album_id,
    //     ),
    //   ),
    // )).flat();

    console.log('songOnAlbumIds : ', songOnAlbumIds);

    // * An optimisation is possible here, we make one request per album, we could make only one
    // Regroup all promises (one per album) in one promise to regroup songs ids to delete
    const songsIds = await Promise.all(
      albumIds.map(async (albumId) => {
        const songs: Song[] = await dataSources
          .lyricsdb
          .songDatamapper
          .findByAlbum(albumId);
        return songs.map((song: Song) => song.id);
      }),
    );

    // Merge all arrays album into one single array
    const SongIdsRegrouped = songsIds.flat();
    const songOnAlbumIdsRegrouped = songOnAlbumIds.flat();

    if (songOnAlbumIdsRegrouped.length > 0) {
      const result = await dataSources
        .lyricsdb
        .songOnAlbumDatamapper
        .deleteMultiple(songOnAlbumIdsRegrouped);
      return result;
    }

    if (albumIds.length > 0) {
      const result = await dataSources
        .lyricsdb
        .albumDatamapper
        .deleteMultiple(albumIds);
      return result;
    }

    if (SongIdsRegrouped.length > 0) {
      const result = await dataSources
        .lyricsdb
        .songDatamapper
        .deleteMultiple(SongIdsRegrouped);
      return result;
    }

    const result = await dataSources
      .lyricsdb
      .artistDatamapper
      .delete(args.id);

    return result;
  },
};

export default Mutation;
