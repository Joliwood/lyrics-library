import * as url from 'url';
import dotenv from 'dotenv';

dotenv.config();
const dirname = url.fileURLToPath(new URL('.', import.meta.url));

const knexConfig = {

  development: {
    client: 'pg',
    connection: {
      user: process.env.PG_USER,
      database: process.env.PG_DATABASE,
      password: process.env.PG_PASSWORD,
      port: process.env.PG_PORT,
      host: process.env.PG_HOST,
      ssl: true,
    },
    migrations: {
      directory: `${dirname}/db/migrations`,
    },
    seeds: {
      directory: `${dirname}/db/seeds`,
    },
  },

  staging: {
    client: 'pg',
    connection: {
      user: process.env.PG_USER,
      database: process.env.PG_DATABASE,
      password: process.env.PG_PASSWORD,
      port: process.env.PG_PORT,
      host: process.env.PG_HOST,
      ssl: true,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: `${dirname}/db/migrations`,
    },
    seeds: {
      directory: `${dirname}/db/seeds`,
    },
  },

  production: {
    client: 'pg',
    connection: {
      user: process.env.PG_USER,
      database: process.env.PG_DATABASE,
      password: process.env.PG_PASSWORD,
      port: process.env.PG_PORT,
      host: process.env.PG_HOST,
      ssl: true,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: `${dirname}/db/migrations`,
    },
    seeds: {
      directory: `${dirname}/db/seeds`,
    },
  },
};

export default knexConfig;
