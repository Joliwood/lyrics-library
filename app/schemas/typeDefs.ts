import { readFileSync } from 'fs';
import * as path from 'path';

const dirname = path.dirname(__filename);

const generalSchema = readFileSync(`${dirname}/generalSchema.gql`, 'utf-8');

const typeDefs = `#graphql
  ${generalSchema}
`;

export default typeDefs;
