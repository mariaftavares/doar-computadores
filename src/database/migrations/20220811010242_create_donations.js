/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('donations', (table) => {
    table.increments('iddonation').primary().unique()
    table.string('name').notNullable()
    table.string('email')
    table.string('phone').notNullable()
    table.string('zip').notNullable()
    table.string('city').notNullable()
    table.string('state').notNullable()
    table.string('streetAddress').notNullable()
    table.string('number').notNullable()
    table.string('complement')
    table.string('neighborhood').notNullable()
    table.integer('deviceCount').notNullable().unsigned()
    table.timestamps(true, true)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('donations')
}
