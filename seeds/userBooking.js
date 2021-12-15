exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('user_booking').del()
        .then(function() {
            // Inserts seed entries
            return knex('user_booking').insert([
                { users_id: 1, course_id: 3, paid: true },
                { users_id: 2, course_id: 4, paid: true },
                { users_id: 3, course_id: 6, paid: false },
            ]);
        });
};