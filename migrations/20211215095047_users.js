exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments();
        table.string("username");
        table.string("surname");
        table.string("firstName");
        table.string("tel");
        table.string("sex");
        table.date("dob");
        table.binary("profilePic");
        table.timestamps(false, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users')
};