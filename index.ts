import { ApolloServer } from '@apollo/server';
// eslint-disable-next-line import/extensions
import { startStandaloneServer } from '@apollo/server/standalone';
import './app/helpers/env.loader.js';
import typeDefs from './app/schemas/typeDefs.js';
import resolvers from './app/resolvers/index.resolver.js';
import LyricsDbDatasource from './app/datasources/lyricsdb.datasource.js';

// Once we received the 2 parts, we send them to the Apollo server
// The Appolo server can be considered as a middleware
const server = new ApolloServer({
  // The typeDefs regroups all schemas
  typeDefs,
  resolvers,
  // cors: {
  //   origin: true, // Allow requests from any origin
  //   credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  // },
});

const port = process.env.PGPORT ?? 3000;

// Then we create and launch the HTTP web server that will be able to respond to client requests
const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => {
    // This cache is specific to Appolo server, not to GraphQL
    const { cache } = server;
    return {
      req,
      // If we want to block all the application with authentification
      // user: login.getUser(req.headers.token, req.ip),
      user: req.headers.tokenuser,
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
              ssl: true,
            },
          },
        }),
      },
    };
  },
  listen: { port },
});

console.log(`🚀  Server ready at: ${url}`);
