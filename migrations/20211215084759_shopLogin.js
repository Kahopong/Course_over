exports.up = function(knex) {
    return knex.schema.createTable('shop_login', (table) => {
        table.increments();
        table.integer("shop_id").unsigned().unique();
        table.foreign("shop_id").references('shop.id');
        table.string("email");
        table.string("password");
        table.timestamps(false, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('shop_login')
};