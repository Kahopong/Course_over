exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('shop').del()
        .then(function() {
            // Inserts seed entries
            return knex('shop').insert([{
                    company: 'Math Tutor',
                    tel: '23002300',
                    email: 'mathtutor@gmail.com'
                },
                {
                    company: 'Paint Tgt',
                    tel: '34567890',
                    email: 'painttgt@gmail.com'
                },
                {
                    company: 'ilovefootball',
                    tel: '51005200',
                    email: 'ilovefootball@gmail.com'
                }
            ]);
        });
};