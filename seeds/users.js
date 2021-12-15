exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('users').del()
        .then(function() {
            // Inserts seed entries
            return knex('users').insert([{
                    username: 'sam123',
                    surname: 'Chan',
                    firstName: 'Sam',
                    tel: '90901234',
                    sex: 'M',
                    dob: '1990-01-31',
                },
                {
                    username: 'bibbib',
                    surname: 'Sur',
                    firstName: 'Bib',
                    tel: '99909990',
                    sex: 'F',
                    dob: '2000-12-25',
                },
                {
                    username: 'iamsid',
                    surname: 'The',
                    firstName: 'Sid',
                    tel: '69696969',
                    sex: 'M',
                    dob: '1989-06-04'
                }
            ]);
        });
};