import CoreDatamapper from './coreDatamapper.js';
import client from '../db/pg.js';

class Manager extends CoreDatamapper {
  tableName = 'manager';
}

export default new Manager(client);
