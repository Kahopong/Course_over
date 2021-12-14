//host a course by a shop
//add, delete, edit

class HostService {
    constructor(knex) {
        this.knex = knex
    }





}

module.exports = HostService;


//For trting individual js files

const knexFile = require('../knexfile').development;
const knex = require('knex')(knexFile);
let hostService = new HostService(knex);