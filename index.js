import { ApolloServer } from '@apollo/server';
// eslint-disable-next-line import/extensions
import { startStandaloneServer } from '@apollo/server/standalone';
import './app/helpers/env.loader.js';

/*
Pour définir un serveur API GraphQL on doit le fournir le QUOI et le COMMENT
QUOI : la description des entités et de requêtes possibles
COMMENT : Comment on récupère techniquement les données de chaque demande.

Le quoi, Apollo le nomme : "typeDef" (définition des types) on l'appelera le schéma.
  Le typeDefs utilise le langage GraphQL
Le comment, Apollo le nomme : "resolvers" (Méthodes de résolution) on l'appelera resolvers.
  Les resolvers utilisent le langage JS
*/
// La récupération du schéma
import typeDefs from './app/schemas/typeDefs.js';

// La récupération des resolvers pour résoudre le comment.
import resolvers from './app/resolvers/index.resolver.js';

// une fois les 2 parties récupérés on les envoi au server Apollo
// Le server Apollo peut être considéré comm: eun middleware
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const port = process.env.PGPORT ?? 3000;

// Ensuite on créer et lance le server web HTTP qui pourra réponsre aux requêtes du client.
const { url } = await startStandaloneServer(server, {
  listen: { port },
});

// eslint-disable-next-line no-console
console.log(`🚀  Server ready at: ${url}`);
