import type {
  Album, MutationResolvers,
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
    const artistId = args.id;

    // Find all albums to delete with the artist id
    const albums = await dataSources
      .lyricsdb
      .albumDatamapper
      .findByArtist(artistId);

    // With all album ids, we can find all songs to delete
    const albumIds: Album['id'][] = albums.map((album: Album) => album.id);

    const songs = await dataSources
      .lyricsdb
      .songDatamapper
      .findByArtist(artistId);

    const songIds = songs.map((song: any) => song.id);

    await dataSources
      .lyricsdb
      .songOnAlbumDatamapper
      .deleteByAlbum(albumIds);

    await dataSources
      .lyricsdb
      .artistLikeSongDatamapper
      .deleteByArtist(artistId);

    await dataSources
      .lyricsdb
      .artistLikeSongDatamapper
      .deleteBySongs(songIds);

    await dataSources
      .lyricsdb
      .albumDatamapper
      .deleteMultiple(albumIds);

    await dataSources
      .lyricsdb
      .songDatamapper
      .deleteMultiple(songIds);

    const artistToDelete = await dataSources
      .lyricsdb
      .artistDatamapper
      .delete(artistId);

    return artistToDelete;
  },

  async deleteSongs(_, args, { dataSources }) {
    const songIds = args.ids;

    await dataSources
      .lyricsdb
      .artistLikeSongDatamapper
      .deleteMultipleAssociations('song_id', songIds);

    await dataSources
      .lyricsdb
      .songOnAlbumDatamapper
      .deleteMultipleAssociations('song_id', songIds);

    const songToDelete = await dataSources
      .lyricsdb
      .songDatamapper
      .deleteMultiple(songIds);

    return songToDelete;
  },
};

export default Mutation;
