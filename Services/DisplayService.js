//display courses at home page of users


class DisplayService {
    constructor(knex) {
        this.knex = knex
    }

    list() {
        return this.knex('course').select('*').then((info) => {
            if (info.length == 0) {
                throw new Error('No Courses to display')
            } else {
                return info
            }
        })
    }

    sort(sorting) {
        return this.knex('course').select('*').where(sorting).then((info) => {
            if (info.length == 0) {
                throw new Error('No Courses to display')
            } else {
                return info
            }
        })
    }

}

module.exports = DisplayService;


//For trying individual js files

const knexFile = require('../knexfile').development;
const knex = require('knex')(knexFile);
let displayService = new DisplayService(knex);

// displayService.list().then((info) => console.log(info))
// displayService.sort({ id: 6 }).then((info) => console.log(info))