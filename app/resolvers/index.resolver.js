const resolvers = {
  Query: {
    artist: async (parent, { id }, context) => {
      const artist = await context.dataSources.coreDataMapper.getArtistById(id);
      return artist;
    },
    album: async (parent, { id }, context) => {
      const album = await context.dataSources.coreDataMapper.getAlbumById(id);
      return album;
    },
  },
  Artist: {
    albums: async (parent, args, context) => {
      const albums = await context.dataSources.coreDataMapper.getAlbumsByArtistId(parent.id);
      return albums;
    },
  },
};

export default resolvers;
