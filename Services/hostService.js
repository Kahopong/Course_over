//host a course by a shop
//list, add, delete, edit

class HostService {
    constructor(knex) {
        this.knex = knex
    }





}

module.exports = HostService;


//For trying individual js files

const knexFile = require('../knexfile').development;
const knex = require('knex')(knexFile);
let hostService = new HostService(knex);