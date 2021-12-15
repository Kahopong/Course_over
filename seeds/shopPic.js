exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('shop_pic').del()
        .then(function() {
            // Inserts seed entries
            return knex('shop_pic').insert([
                { shop_id: 1 },
                { shop_id: 2 },
                { shop_id: 3 }
            ]);
        });
};