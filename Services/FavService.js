//fav , unfav


class FavService {
    constructor(knex) {
        this.knex = knex
    }





}

module.exports = FavService;


//For trying individual js files

const knexFile = require('../knexfile').development;
const knex = require('knex')(knexFile);
let favService = new FavService(knex);