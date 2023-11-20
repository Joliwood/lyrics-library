/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema
  .createTable('artist', (table) => {
    table.increments('id').primary();
    table.text('name').notNullable();
    table.text('picture');
    table.text('country');
    table.text('email').unique();
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updated_at');
  })
  .createTable('album', (table) => {
    table.increments('id').primary();
    table.text('title').notNullable();
    table.integer('release_year');
    table.text('cover');
    table.integer('artist_id').notNullable().references('id').inTable('artist');
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updated_at');
  })
  .createTable('song', (table) => {
    table.increments('id').primary();
    table.text('title').notNullable();
    table.integer('duration').notNullable();
    table.text('cover');
    table.text('lyrics');
    table.integer('artist_id').notNullable().references('id').inTable('artist');
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updated_at');
  })
  .createTable('song_on_album', (table) => {
    table.integer('album_id').notNullable().references('id').inTable('album');
    table.integer('song_id').notNullable().references('id').inTable('song');
    table.integer('position').notNullable();
    table.primary(['album_id', 'song_id']);
  })
  .createTable('artist_like_song', (table) => {
    table.integer('artist_id').notNullable().references('id').inTable('artist');
    table.integer('song_id').notNullable().references('id').inTable('song');
    table.primary(['artist_id', 'song_id']);
  });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema
  .dropTable('artist_like_song')
  .dropTable('song_on_album')
  .dropTable('song')
  .dropTable('album')
  .dropTable('artist');
