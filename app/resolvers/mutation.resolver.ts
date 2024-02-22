import type { AlbumRow, MutationResolversType, SongRow } from '#types';

const Mutation: MutationResolversType = {
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

  async updateArtist(_, args, { dataSources }) {
    const row = await dataSources.lyricsdb.artistDatamapper.update(args.id, args.input);
    return row;
  },

  async deleteArtist(_, args, { dataSources }) {
    // Find all albums to delete with the artist id
    const albums = await dataSources.lyricsdb.albumDatamapper.findByArtist(args.id);

    // With all album ids, we can find all songs to delete
    const albumIds = albums.map((album: AlbumRow) => album.id);

    // * An optimisation is possible here, we make one request per album, we could make only one
    // Regroup all promises (one per album) in one promise to regroup songs ids to delete
    const songsIds = await Promise.all(
      albumIds.map(async (albumId: AlbumRow['id']) => {
        const songs = await dataSources.lyricsdb.songDatamapper.findByAlbum(albumId);
        return songs.map((song: SongRow) => song.id);
      }),
    );

    // Merge all arrays album into one single array
    const SongIdsRegrouped = songsIds.flat();

    if (albumIds.length > 0) {
      const result = await dataSources.lyricsdb.albumDatamapper.deleteMultiple(albumIds);
      return result;
    }

    if (SongIdsRegrouped.length > 0) {
      const result = await dataSources.lyricsdb.songDatamapper.deleteMultiple(SongIdsRegrouped);
      return result;
    }

    const result = await dataSources.lyricsdb.artistDatamapper.delete(args.id);

    return result;
  },
};

export default Mutation;
