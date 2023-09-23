import debug from 'debug';
import pg from 'pg';

const debugSql = debug('app:sql');

const pool = new pg.Pool({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  // We can't use PGUSER because it's already used by Postgres
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
});

let queryCount = 0;

export default {
  originalClient: pool,

  async query(...params) {
    debugSql(...params);
    queryCount += 1;
    debugSql(`Req n°${queryCount}`);

    return this.originalClient.query(...params);
  },
};
