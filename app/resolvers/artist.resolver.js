import { GraphQLError } from 'graphql';
import getUser from '../services/login.service.js';

export default {
  async albums(parent, _, { req, user, dataSources }) {
    // const decoded = jwt.verify(req.headers.authorization);
    console.log('user is : ', user);
    const userAuthorized = getUser(user, req.ip);
    if (!userAuthorized) {
      throw new GraphQLError('Authentication failed', {
        extensions: {
          code: 'UNAUTHENTICATED',
        },
      });
    }
    const rows = await dataSources.lyricsdb.albumDatamapper.findByArist(parent.id);
    return rows;
  },
};
