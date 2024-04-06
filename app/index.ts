import 'module-alias/register';

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import './helpers/env.loader';
import typeDefs from './schemas/typeDefs';
import resolvers from './resolvers/index.resolver';
import LyricsDbDatasource from './datasources/lyricsdb.datasource';

import { type GraphQLContext } from '#types';

// Immediately Invoked Function Expression (IIFE)
(async () => {
  const server = new ApolloServer<GraphQLContext>({
    typeDefs,
    resolvers,
    // cors: {
    //   origin: true, // Allow requests from any origin
    //   credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    // },
  });

  const connectionUrl = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;
  const sslConfig = process.env.PG_SSL_OPTION === 'true' ? '?ssl=true' : '';
  const fullConnectionUrl = connectionUrl + sslConfig;

  const { url } = await startStandaloneServer<GraphQLContext>(server, {
    context: async ({ req }) => {
      const { cache } = server;
      return {
        req,
        userEncoded: req.headers.authorization,
        dataSources: {
          lyricsdb: new LyricsDbDatasource({
            cache,
            knexConfig: {
              client: 'pg',
              connection: fullConnectionUrl,
            },
          }),
        },
      };
    },
    listen: { port: Number(process.env.PGPORT || 3000) },
  });

  // eslint-disable-next-line no-console
  console.log(`🚀  Server ready at: ${url}`);
})();
