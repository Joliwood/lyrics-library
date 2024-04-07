import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('artist_like_song');
  await knex.schema.dropTableIfExists('song_on_album');
  await knex.schema.dropTableIfExists('song');
  await knex.schema.dropTableIfExists('album');
  await knex.schema.dropTableIfExists('artist');
  await knex.schema.createTable('artist', (table) => {
    table.increments('id').primary();
    table.text('country');
    table.text('email').unique();
    table.text('name').notNullable();
    table.text('password').notNullable();
    table.text('picture');
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updated_at');
  });
  await knex.schema.createTable('album', (table) => {
    table.increments('id').primary();
    table.integer('artist_id').notNullable().references('id').inTable('artist');
    table.integer('release_year');
    table.text('cover');
    table.text('title').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updated_at');
  });
  await knex.schema.createTable('song', (table) => {
    table.increments('id').primary();
    table.integer('artist_id').notNullable().references('id').inTable('artist');
    table.integer('duration').notNullable();
    table.integer('release_year');
    table.text('cover');
    table.text('lyrics');
    table.text('title').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updated_at');
  });
  await knex.schema.createTable('song_on_album', (table) => {
    table.integer('album_id').notNullable().references('id').inTable('album');
    table.integer('position').notNullable();
    table.integer('song_id').notNullable().references('id').inTable('song');
    table.primary(['album_id', 'song_id']);
  });
  await knex.schema.createTable('artist_like_song', (table) => {
    table.integer('artist_id').notNullable().references('id').inTable('artist');
    table.integer('song_id').notNullable().references('id').inTable('song');
    table.primary(['artist_id', 'song_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTable('artist_like_song');
  knex.schema.dropTable('song_on_album');
  knex.schema.dropTable('song');
  knex.schema.dropTable('album');
  knex.schema.dropTable('artist');
}
