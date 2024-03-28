import 'module-alias/register';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import './helpers/env.loader';
import typeDefs from './schemas/typeDefs';
import resolvers from './resolvers/index.resolver';
import LyricsDbDatasource from './datasources/lyricsdb.datasource';

const startServer = async () => {
// Once we received the 2 parts, we send them to the Apollo server
// The Appolo server can be considered as a middleware
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  // cors: {
  //   origin: true, // Allow requests from any origin
  //   credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  // },
  });

  const port = process.env.PGPORT;

  // Then we create and launch the HTTP web server that will be able to respond to client requests
  const { url } = await startStandaloneServer<any>(server, {
    context: async ({ req }) => {
      const { cache } = server;
      return {
        req,
        // If we want to block all the application with authentification
        // user: login.getUser(req.headers.token, req.ip),
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
    listen: { port: Number(port || 3000) },
  });

  // eslint-disable-next-line no-console
  console.log(`🚀  Server ready at: ${url}`);
};

// Immediately Invoked Function Expression (IIFE)
(async () => {
  await startServer();
})();
