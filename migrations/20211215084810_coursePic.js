exports.up = function(knex) {
    return knex.schema.createTable('course_pic', (table) => {
        table.increments();
        table.integer("course_id").unsigned().unique();
        table.foreign("course_id").references('course.id');
        table.binary("pic1");
        table.binary("pic2");
        table.binary("pic3");
        table.timestamps(false, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('course_pic')
};