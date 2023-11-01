import { ApolloServer } from '@apollo/server';
// eslint-disable-next-line import/extensions
import { startStandaloneServer } from '@apollo/server/standalone';
import './app/helpers/env.loader.js';
import typeDefs from './app/schemas/typeDefs.js';
import resolvers from './app/resolvers/index.resolver.js';
import LyricsDbDatasource from './app/datasources/lyricsdb.datasource.js';
import login from './app/services/login.service.js';

// une fois les 2 parties récupérés on les envoi au server Apollo
// Le server Apollo peut être considéré comm: eun middleware
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // cors: {
  //   origin: true, // Allow requests from any origin
  //   credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  // },

  // WIP //
  context: async ({ req }) => {
    user: req.user, // This contains the authenticated user info if available
    // other context data...
  },
});

const port = process.env.PGPORT ?? 3000;

// Ensuite on créer et lance le server web HTTP qui pourra réponsre aux requêtes du client.
const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => {
    // This cache is specific to Appolo server, not to GraphQL
    const { cache } = server;
    let token;
    if (req.headers.authorization) {
      [, token] = req.headers.authorization.split(' ');
    }
    return {
      req,
      user: login.getUser(token, req.ip),
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

// eslint-disable-next-line no-console
console.log(`🚀  Server ready at: ${url}`);
