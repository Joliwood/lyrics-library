import CoreDatamapper from './coreDatamapper.js';
import client from '../db/pg.js';

class Album extends CoreDatamapper {
  tableName = 'album';
}

export default new Album(client);
