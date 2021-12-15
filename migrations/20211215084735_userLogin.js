exports.up = function(knex) {
    return knex.schema.createTable('user_login', (table) => {
        table.increments();
        table.integer("users_id").unsigned().unique();
        table.foreign("users_id").references('users.id');
        table.string("email");
        table.string("password");
        table.timestamps(false, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('user_login')
};