import { type Resolvers } from '../../types/__generated_schemas__/graphql';

import {
  Album,
  Artist,
  ArtistLikeSong,
  Mutation,
  Query,
  Song,
  SongOnAlbum,
} from '#resolvers';

const resolvers: Resolvers = {
  Album,
  Artist,
  ArtistLikeSong,
  Mutation,
  Query,
  Song,
  SongOnAlbum,
};

export default resolvers;
