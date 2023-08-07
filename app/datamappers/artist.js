import CoreDatamapper from './coreDatamapper.js';
import client from '../db/pg.js';

class Artist extends CoreDatamapper {
  tableName = 'artist';
}

export default new Artist(client);
