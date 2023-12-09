/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema
  .raw(`
      CREATE DOMAIN "year" AS integer
      CHECK (value >= 1900 AND value <= 2100);

      CREATE DOMAIN "duration" AS integer
      CHECK (value >= 0);
    `)
  .createTable('artist', (table) => {
    table.increments('id').primary();
    table.text('name').notNullable();
    table.text('country');
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updated_at');
  })
  .createTable('album', (table) => {
    table.increments('id').primary();
    table.text('title').notNullable();
    table.integer('release_year');
    table.integer('artist_id').notNullable().references('id').inTable('artist');
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updated_at');
  })
  .createTable('song', (table) => {
    table.increments('id').primary();
    table.text('title').notNullable();
    table.integer('duration').notNullable();
    table.text('lyrics');
    table.integer('album_id').notNullable().references('id').inTable('album');
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updated_at');
  });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.raw(`
    DROP DOMAIN IF EXISTS "year";
    DROP DOMAIN IF EXISTS "duration";
  `)
  .dropTable('artist')
  .dropTable('album')
  .dropTable('song');
