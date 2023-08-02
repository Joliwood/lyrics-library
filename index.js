import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import './app/helpers/env.loader.js';

// Pour définir un serveur API GraphQL on doit le fournir le QUOI et le COMMENT
// QUOI : la description des entités et de requêtes possibles
// COMMENT : Comment on récupère techniquement les données de chaque demande.

// Le quoi, Apollo le nomme : "typeDef" (définition des types) on l'appelera le schéma.
//  Le typeDefs utilise le langage GraphQL
// Le comment, Apollo le nomme : "resolvers" (Méthodes de résolution) on l'appelera resolvers.
//  Les resolvers utilisent le langage JS

// La récupération du schéma
import typeDefs from './app/schemas/typeDefs.js';
