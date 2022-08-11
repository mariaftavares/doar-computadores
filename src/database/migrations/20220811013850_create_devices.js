/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
  return knex.schema
  .createTable('devices', (table)=> {
      table.increments('id').primary().unique();
      table.string('type').notNullable();
      table.string('condition').notNullable();
      table.integer('donations_id').unsigned();
      table.foreign('donations_id')
           .references('donations.id')
           .onDelete('CASCADE')
           .onUpdate('CASCADE');
      table.timestamps(true,true);
      
  })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

  return knex.schema.dropTable('devices')
  
};
