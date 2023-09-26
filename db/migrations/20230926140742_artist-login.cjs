/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.alterTable('artist', (table) => {
  table.text('email');
  table.text('password');
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.alterTable('artist', (table) => {
  table.dropColumn('email');
  table.dropColumn('password');
});
