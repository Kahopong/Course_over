exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('course').del()
        .then(function() {
            // Inserts seed entries
            return knex('course').insert([{
                    shop_id: 1,
                    title: 'Math tutorial I',
                    category: 'School Subjects',
                    date: '2022-01-15',
                    timeStart: '18:00',
                    timeEnd: '19:30',
                    price: 150,
                    quota: 10,
                    ageRange: 'kids',
                },
                {
                    shop_id: 1,
                    title: 'Math tutorial II',
                    category: 'School Subjects',
                    date: '2022-01-16',
                    timeStart: '19:00',
                    timeEnd: '21:00',
                    price: 180,
                    quota: 12,
                    ageRange: 'kids,junior',
                },
                {
                    shop_id: 2,
                    title: 'Portrait Painting',
                    category: 'Art',
                    date: '2022-01-20',
                    timeStart: '16:00',
                    timeEnd: '17:00',
                    price: 250,
                    quota: 5,
                    ageRange: 'adults,senior',
                },
                {
                    shop_id: 2,
                    title: 'Landscape Painting',
                    category: 'Art',
                    date: '2022-01-27',
                    timeStart: '12:00',
                    timeEnd: '13:00',
                    price: 250,
                    quota: 5,
                    ageRange: 'adults,senior',
                },
                {
                    shop_id: 3,
                    title: 'Football for kids',
                    category: 'Sports',
                    date: '2022-01-19',
                    timeStart: '17:00',
                    timeEnd: '18:30',
                    price: 120,
                    quota: 20,
                    ageRange: 'kids',
                },
                {
                    shop_id: 3,
                    title: 'Football for adults',
                    category: 'Sports',
                    date: '2022-01-31',
                    timeStart: '21:00',
                    timeEnd: '22:30',
                    price: 180,
                    quota: 20,
                    ageRange: 'adults,senior',
                },
            ]);
        });
};