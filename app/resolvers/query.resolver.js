import { GraphQLError } from 'graphql';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default {
  async albums(_, __, { dataSources }) {
    const rows = await dataSources.lyricsdb.albumDatamapper.findAll();
    return rows;
  },

  async album(_, args, { dataSources }) {
    // All findByPk can be replace here by idsLoader to use same method most of the time
    // but for single query, it will not improve speed response
    const row = await dataSources.lyricsdb.albumDatamapper.idsLoader.load(args.id);
    return row;
  },

  async songs(_, __, { dataSources }) {
    const rows = await dataSources.lyricsdb.songDatamapper.findAll();
    return rows;
  },

  async song(_, args, { dataSources }) {
    const row = await dataSources.lyricsdb.songDatamapper.idsLoader.load(args.id);
    return row;
  },

  async artists(_, __, { dataSources }) {
    const rows = await dataSources.lyricsdb.artistDatamapper.findAll();
    return rows;
  },

  async artist(_, args, { dataSources }) {
    const row = await dataSources.lyricsdb.artistDatamapper.idsLoader.load(args.id);
    return row;
  },

  async login(_, args, { dataSources }) {
    const { email, password } = args.input;

    // Use findByEmail to find a user by their email
    const [user] = await dataSources.lyricsdb.artistDatamapper.findAll({ email });

    if (!user) {
      throw new GraphQLError('Authentication failed', {
        extensions: {
          code: 'UNAUTHENTICATED',
        },
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new GraphQLError('Authentication failed again', {
        extensions: {
          code: 'UNAUTHENTICATED',
        },
      });
    }

    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TTL });
    const expireAt = new Date();
    expireAt.setSeconds(expireAt.getSeconds() + process.env.JWT_TTL);
    return {
      token,
      expire_at: expireAt,
    };
  },
};