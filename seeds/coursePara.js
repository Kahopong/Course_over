exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('course_para').del()
        .then(function() {
            // Inserts seed entries
            return knex('course_para').insert([{
                    course_id: 1,
                    about: 'About Math tutorial I',
                    specialNote: 'Special note of Math tutorial I'
                },
                {
                    course_id: 2,
                    about: 'About Math tutorial II',
                    specialNote: 'Special note of Math tutorial II'
                },
                {
                    course_id: 3,
                    about: 'About Portrait Painting',
                    specialNote: 'Special note of Portrait Painting'
                },
                {
                    course_id: 4,
                    about: 'About Landscape Painting',
                    specialNote: 'Special note of Landscape Painting'
                },
                {
                    course_id: 5,
                    about: 'About Football for kids',
                    specialNote: 'Special note of Football for kids'
                },
                {
                    course_id: 6,
                    about: 'About Football for adults',
                    specialNote: 'Special note of Football for adults'
                }
            ]);
        });
};