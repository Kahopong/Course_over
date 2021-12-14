//list edit info for shops and users


class InfoService {
    constructor(knex) {
        this.knex = knex
    }





}

module.exports = InfoService;


//For trting individual js files

const knexFile = require('../knexfile').development;
const knex = require('knex')(knexFile);
let infoService = new InfoService(knex);