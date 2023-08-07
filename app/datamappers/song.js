import CoreDatamapper from './coreDatamapper.js';
import client from '../db/pg.js';

class Song extends CoreDatamapper {
  constructor() {
    super('song');
  }
}

export default new Song(client);
