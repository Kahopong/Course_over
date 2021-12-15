exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('user_login').del()
        .then(function() {
            // Inserts seed entries
            return knex('user_login').insert([{
                    users_id: 1,
                    email: 'sam@sam.com',
                    password: 'sam'
                },
                {
                    users_id: 2,
                    email: 'bib@bib.com',
                    password: 'bib'
                },
                {
                    users_id: 3,
                    email: 'sid@sid.com',
                    password: 'sid'
                }
            ]);
        });
};