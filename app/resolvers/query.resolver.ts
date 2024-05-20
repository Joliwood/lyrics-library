import { compare } from 'bcrypt';
import { GraphQLError } from 'graphql';
import { sign } from 'jsonwebtoken';

import {
  type QueryResolvers,
  type Album,
  type Song,
  type Artist,
  type ArtistUser,
} from '../../types/__generated_schemas__/graphql';

import { checkAuthentification, isEqual } from '#utils';
import { type GraphQLContext } from '#types';

const Query: QueryResolvers<GraphQLContext> = {
  async albums(_, args, { dataSources, userEncoded }) {
    const { limit, filter } = args;

    const albums = await dataSources
      .lyricsdb
      .albumDatamapper
      .findAll<typeof args, Album[]>({ limit, filter, userEncoded });

    return albums;
  },

  async album(_, args, { dataSources }) {
    // All findByPk can be replace here by idsLoader to use same method most of the time
    // but for single query, it will not improve speed response
    const album = await dataSources
      .lyricsdb
      .albumDatamapper
      .idsLoader
      .load(args.id);

    return album;
  },

  async songs(_, args, { dataSources, userEncoded }) {
    const { limit, filter } = args;
    const rows = await dataSources
      .lyricsdb
      .songDatamapper
      .findAll<typeof args, Song[]>({ limit, filter, userEncoded });

    return rows;
  },

  async song(_, args, { dataSources }) {
    const songId = args.id;
    const row = await dataSources
      .lyricsdb
      .songDatamapper
      .idsLoader
      .load(songId);

    return row;
  },

  async artists(_, __, { dataSources }) {
    const rows = await dataSources
      .lyricsdb
      .artistDatamapper
      .findAll<undefined, Artist[]>();

    return rows;
  },

  async artist(_, args, { dataSources }) {
    const row = await dataSources
      .lyricsdb
      .artistDatamapper
      .idsLoader
      .load(args.id);

    return row;
  },

  async login(_, args, { dataSources }) {
    const {
      email,
      password,
    } = args.input;

    const user = await dataSources.lyricsdb.artistDatamapper.findByEmail(email);

    if (!user) {
      throw new GraphQLError('Authentication failed', {
        extensions: {
          code: 'UNAUTHENTICATED',
        },
      });
    }

    const isPasswordValid = user.email === 'admin@gmail.com'
      ? isEqual(password, user.password)
      : await compare(password, user.password);

    if (!isPasswordValid) {
      throw new GraphQLError('Authentication failed again', {
        extensions: {
          code: 'UNAUTHENTICATED',
        },
      });
    }

    if (process.env.JWT_SECRET == null) {
      throw new GraphQLError('JWT_SECRET not provided', {
        extensions: {
          code: 'ENV_SETUP',
        },
      });
    }

    const userInfos = {
      id: user.id,
    };

    const token = sign(userInfos, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TTL,
    });
    const expireAt = new Date();
    expireAt.setSeconds(expireAt.getSeconds() + Number(process.env.JWT_TTL));

    return {
      token,
      expire_at: expireAt.toString(),
    };
  },

  async profile(_, __, { dataSources, userEncoded }) {
    const userId = checkAuthentification({ userEncoded });

    if (!userId) {
      throw new GraphQLError('Authentication failed', {
        extensions: {
          code: 'UNAUTHENTICATED',
        },
      });
    }

    const profile = await dataSources
      .lyricsdb
      .artistDatamapper
      .findByPk<ArtistUser>(userId);

    return profile;
  },
};

export default Query;
