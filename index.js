import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import './app/helpers/env.loader.js';

import typeDefs from './app/schemas/typeDefs.js';
import resolvers from './app/resolvers/index.resolver.js';

// une fois les 2 parties récupérés on les envoi au server Apollo
// Le server Apollo peut être considéré comm: eun middleware
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // cors: {
  //   origin: true, // Allow requests from any origin
  //   credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  // },
});

const port = process.env.PGPORT ?? 3000;

// Ensuite on créer et lance le server web HTTP qui pourra réponsre aux requêtes du client.
const { url } = await startStandaloneServer(server, {
  listen: { port },
});

// eslint-disable-next-line no-console
console.log(`🚀  Server ready at: ${url}`);
