import debug from 'debug';
import pg from 'pg';

const debugSql = debug('app:sql');

const pool = new pg.Pool({
  host: 'localhost',
  port: 5432,
  database: 'lyrics_library',
  user: 'admin',
  password: 'admin',
})

let queryCount = 0;

export default {
  originalClient: pool,

  async query(...params) {
    // await pool.connect();
    debugSql(...params);
    queryCount += 1;
    debugSql(`Req n°${queryCount}`);
    
    return this.originalClient.query(...params);
  },
};
