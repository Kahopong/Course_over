exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('user_review').del()
        .then(function() {
            // Inserts seed entries
            return knex('user_review').insert([
                { users_id: 1, course_id: 1, content: 'Not too good', rating: 2 },
                { users_id: 2, course_id: 3, content: 'Ok la, quite fun :D', rating: 4 },
                { users_id: 3, course_id: 5, content: 'Such a nice experience!', rating: 5 },
            ]);
        });
};