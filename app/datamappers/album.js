import CoreDatamapper from './coreDatamapper.js';
import client from '../db/pg.js';

class Album extends CoreDatamapper {
  constructor() {
    super('album');
  }
}

export default new Album(client);
