import CoreDatamapper from './coreDatamapper.js';
import client from '../db/pg.js';

class City extends CoreDatamapper {
  tableName = 'city';
}

export default new City(client);
