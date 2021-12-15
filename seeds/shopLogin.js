exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('shop_login').del()
        .then(function() {
            // Inserts seed entries
            return knex('shop_login').insert([{
                    shop_id: 1,
                    email: 'mathtutor@gmail.com',
                    password: 'mathtutor'
                },
                {
                    shop_id: 2,
                    email: 'painttgt@gmail.com',
                    password: 'painttgt'
                },
                {
                    shop_id: 3,
                    email: 'ilovefootball@gmail.com',
                    password: 'ilovefootball'
                }
            ]);
        });
};