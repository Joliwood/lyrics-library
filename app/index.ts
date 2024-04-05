import 'module-alias/register';

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import './helpers/env.loader';
import typeDefs from './schemas/typeDefs';
import resolvers from './resolvers/index.resolver';
import LyricsDbDatasource from './datasources/lyricsdb.datasource';

import { type GraphQLContext } from '#types';

const startServer = async () => {
  const server = new ApolloServer<GraphQLContext>({
    typeDefs,
    resolvers,
    // cors: {
    //   origin: true, // Allow requests from any origin
    //   credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    // },
  });

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
              connection: {
                user: process.env.PG_USER,
                database: process.env.PG_DATABASE,
                password: process.env.PG_PASSWORD,
                port: process.env.PG_PORT,
                host: process.env.PG_HOST,
                ssl: process.env.PG_SSL_OPTION === 'true',
              },
            },
          }),
        },
      };
    },
    listen: { port: Number(process.env.PGPORT || 3000) },
    // context: async ({ req, res }) => ({
    //   authScope: getScope(req.headers.authorization),
    // }),
  });

  // eslint-disable-next-line no-console
  console.log(`🚀  Server ready at: ${url}`);
};

// Immediately Invoked Function Expression (IIFE)
(async () => {
  await startServer();
})();
