import CoreDatamapper from './coreDatamapper.js';
import client from '../db/pg.js';

class Song extends CoreDatamapper {
  tableName = 'song';
}

export default new Song(client);