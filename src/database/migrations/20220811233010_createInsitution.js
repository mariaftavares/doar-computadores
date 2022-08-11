/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('institutions', (table)=> {
        table.increments('idinstitutions').primary().unique();
        table.string('name').notNullable();
        table.string('email').unique().notNullable();
        table.string('phone').notNullable();
        table.string('zip').notNullable();
        table.string('city').notNullable();
        table.string('state').notNullable();
        table.string('streetAddress').notNullable();
        table.string('number').notNullable();
        table.string('complement');
        table.string('neighborhood').notNullable();
        table.text('description').notNullable();
        table.string('type').notNullable();
        table.string('urlInstagram');
        table.string('urlFacebook');
        table.string('urlLinkedin');
        table.string('urlSite');
        table.boolean('validated').defaultTo(null);        
        table.timestamps(true,true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('institutions')
};
