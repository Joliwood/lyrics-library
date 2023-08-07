import CoreDatamapper from './coreDatamapper.js';
import client from '../db/pg.js';

class Artist extends CoreDatamapper {
  constructor() {
    super('artist');
  }
}

export default new Artist(client);
