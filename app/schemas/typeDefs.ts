import { readFileSync } from 'fs';
// WIP
// import * as url from 'url';
import * as path from 'path';
// EOL = End of line adapted for every OS
// import { EOL } from 'os';

// const dirname = url.fileURLToPath(new URL('.', import.meta.url));
const dirname = path.dirname(__filename);
// const schemaNames = [ 'album', 'artist', 'song', 'song_on_album',
//   'artist_like_song', 'query', 'mutation',
// ];
// const schemas = schemaNames.map((schemaName) =>
// readFileSync(`${dirname}/${schemaName}.gql`, 'utf-8'));

const generalSchema = readFileSync(`${dirname}/generalSchema.gql`, 'utf-8');

const typeDefs = `#graphql
  ${generalSchema}
`;

export default typeDefs;
