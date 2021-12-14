//book a course by a user
//book
//unbook
//list

//paid? change by shop

class BookService {
    constructor(knex) {
        this.knex = knex
    }





}

module.exports = BookService;


//For trting individual js files

const knexFile = require('../knexfile').development;
const knex = require('knex')(knexFile);
let bookService = new BookService(knex);