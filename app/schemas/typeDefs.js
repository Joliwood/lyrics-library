import { readFileSync } from 'fs';
import * as url from 'url';
// EOL = End of line adapted for every OS
import { EOL } from 'os';

const dirname = url.fileURLToPath(new URL('.', import.meta.url));
const schemaNames = [
  'album',
  'artist',
  'song',
  'song_on_album',
  'artist_like_song',
  'query',
  'mutation',
];
const schemas = schemaNames.map((schemaName) => readFileSync(`${dirname}${schemaName}.gql`, 'utf-8'));

const typeDefs = `#graphql
  ${schemas.join(EOL)}
`;

export default typeDefs;
