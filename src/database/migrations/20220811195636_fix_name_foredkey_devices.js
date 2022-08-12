/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up =   function(knex) {
  return knex.schema.alterTable('devices', (table) => {
  
    table.dropForeign('donations_iddonation','devices_donations_iddonation_foreign');
    table.renameColumn('donations_iddonation','donation_id');

    table.foreign('donation_id')
         .references('donations.id')
         .onDelete('CASCADE')
         .onUpdate('CASCADE');
    
  })
 
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down =  function(knex) {

  return knex.schema.alterTable('devices', (table) => {
  
    table.dropForeign('donation_id','devices_donation_id_foreign');
    table.renameColumn('donation_id','donations_iddonation');

    table.foreign('donations_iddonation')
        .references('donations.id')
         .onDelete('CASCADE')
         .onUpdate('CASCADE');
  
   
  })
  
};