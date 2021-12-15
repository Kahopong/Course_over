exports.up = function(knex) {
    return knex.schema.createTable('course_para', (table) => {
        table.increments();
        table.integer("course_id").unsigned().unique();
        table.foreign("course_id").references('course.id');
        table.string("about");
        table.string("specialNote");
        table.timestamps(false, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('course_para')
};