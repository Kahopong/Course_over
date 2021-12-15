exports.up = function(knex) {
    return knex.schema.createTable('shop', (table) => {
        table.increments();
        table.string("company").notNullable();
        table.string("tel");
        table.string("email");
        table.timestamps(false, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('shop')
};