exports.up = function(knex) {
    return knex.schema.createTable('course', (table) => {
        table.increments();
        table.integer("shop_id").unsigned();
        table.foreign("shop_id").references('shop.id');
        table.string("title").notNullable();
        table.string("category");
        table.date("date");
        table.time("timeStart");
        table.time("timeEnd");
        table.decimal("price");
        table.integer("quota");
        table.string("ageRange");
        table.boolean('listing');
        table.boolean('confirm');
        table.timestamps(false, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('course')
};