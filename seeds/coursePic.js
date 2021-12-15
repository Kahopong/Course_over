exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('course_pic').del()
        .then(function() {
            // Inserts seed entries
            return knex('course_pic').insert([
                { course_id: 1 },
                { course_id: 2 },
                { course_id: 3 },
                { course_id: 4 },
                { course_id: 5 },
                { course_id: 6 },
            ]);
        });
};