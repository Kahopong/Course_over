exports.up = function(knex) {
    return knex.schema.createTable('shop_pic', (table) => {
        table.increments();
        table.integer("shop_id").unsigned().unique();
        table.foreign("shop_id").references('shop.id');
        table.binary("logo");
        table.binary("banner");
        table.timestamps(false, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('shop_pic')
};