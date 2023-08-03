import { readFileSync } from 'fs';
import * as url from 'url';

const dirname = url.fileURLToPath(new URL('.', import.meta.url));

const schema = readFileSync(`${dirname}/schema.gql`, 'utf-8');

const typeDefs = `#graphql
  ${schema}
`;

export default typeDefs;
