//List my course
//current booking,favourite and reviews

class MyCourseService {
    constructor(knex) {
        this.knex = knex
    }
    
    listbooking(id){
        this.knex
    }




}

module.exports = MyCourseService;


//For trying individual js files

const knexFile = require('../knexfile').development;
const knex = require('knex')(knexFile);
let myCourseService = new MyCourseService(knex);