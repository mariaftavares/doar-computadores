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
      table.integer('donations_iddonation').unique().unsigned();
      table.foreign('donations_iddonation')
           .references('donations.iddonation')
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
