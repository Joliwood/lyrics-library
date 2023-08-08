import { readFileSync } from 'fs';
import * as url from 'url';
import { EOL } from 'os';

const dirname = url.fileURLToPath(new URL('.', import.meta.url));
const schemaNames = [
  // 'album',
  // 'artist',
  'song',
  // 'query'
];
const schemas = schemaNames.map((schemaName) =>  readFileSync(`${dirname}${schemaName}.gql`, 'utf-8'));

const typeDefs = `#graphql
  ${schemas.join(EOL)}
`;

export default typeDefs;
