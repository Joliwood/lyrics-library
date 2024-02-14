import { readFileSync, writeFileSync } from 'fs';
import * as path from 'path';
import { EOL } from 'os';

const dirname = path.dirname(new URL(import.meta.url).pathname);

const schemaNames = [
  'album',
  'artist',
  'song',
  'song_on_album',
  'artist_like_song',
  'query',
  'mutation',
];

const generalSchema = schemaNames
  .map((schemaName) => {
    const filePath = path.join(dirname, `../schemas/${schemaName}.gql`);
    return readFileSync(filePath, 'utf-8');
  })
  .join(EOL);

const outputFilePath = path.join(dirname, '../schemas/generalSchema.gql');
writeFileSync(outputFilePath, generalSchema, 'utf-8');

console.log(`Merged schema saved to: ${outputFilePath}`);
