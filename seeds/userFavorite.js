exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('user_favorite').del()
        .then(function() {
            // Inserts seed entries
            return knex('user_favorite').insert([
                { users_id: 1, course_id: 1 },
                { users_id: 1, course_id: 6 },
                { users_id: 2, course_id: 1 },
                { users_id: 2, course_id: 2 },
                { users_id: 2, course_id: 3 },
                { users_id: 2, course_id: 4 },
                { users_id: 3, course_id: 1 },
                { users_id: 3, course_id: 2 },
            ]);
        });
};