import { compare } from 'bcrypt';
import { GraphQLError } from 'graphql';
import { jwtDecode } from 'jwt-decode';
import { sign } from 'jsonwebtoken';

import { isEqual } from '#utils';
import type { QueryResolvers } from '../../types/__generated_schemas__/graphql';
import login from '../services/login.service';
import type { ProfileJWT } from '#types';

const Query: QueryResolvers = {
  async albums(_, { limit, filter }, { req, user, dataSources }) {
    const userAuthorized = login.getUser(user, req.ip);
    if (!userAuthorized) {
      // throw new GraphQLError('Authentication failed', {
      //   extensions: {
      //     code: 'UNAUTHENTICATED',
      //   },
      // });
      // eslint-disable-next-line no-console
      console.log("Vous n'êtes pas authentifié mais passons...");
    }
    const rows = await dataSources.lyricsdb.albumDatamapper.findAll({ limit, filter });
    return rows;
  },

  async album(_, args, { dataSources }) {
    // All findByPk can be replace here by idsLoader to use same method most of the time
    // but for single query, it will not improve speed response
    const row = await dataSources.lyricsdb.albumDatamapper.idsLoader.load(
      args.id,
    );
    return row;
  },

  async songs(_, { limit, filter }, { dataSources }) {
    const rows = await dataSources.lyricsdb.songDatamapper.findAll({ limit, filter });
    return rows;
  },

  async song(_, args, { dataSources }) {
    const row = await dataSources.lyricsdb.songDatamapper.idsLoader.load(
      args.id,
    );
    return row;
  },

  async artists(_, __, { dataSources }) {
    const rows = await dataSources.lyricsdb.artistDatamapper.findAll();
    return rows;
  },

  async artist(_, args, { dataSources }) {
    const row = await dataSources.lyricsdb.artistDatamapper.idsLoader.load(
      args.id,
    );
    return row;
  },

  async login(_, args, { dataSources, req }) {
    const { email, password } = args.input;

    // Use findByEmail to find a user by their email
    const [user] = await dataSources.lyricsdb.artistDatamapper.findAll({
      email,
    });

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
      return null;
    }

    const userInfos = {
      id: user.id,
      ip: req.ip,
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
    if (!userEncoded) {
      throw new GraphQLError('Authentication failed', {
        extensions: {
          code: 'UNAUTHENTICATED',
        },
      });
    }

    const userDecoded = jwtDecode<ProfileJWT>(userEncoded);
    const { id } = userDecoded;

    const profile = await dataSources.lyricsdb.artistDatamapper.findByPk(id);

    return profile;
  },
};

export default Query;
