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
        return this.knex('course').select('*')
            .whereIn('category', sorting.category)
            .andWhere(function() {
                this.orWhereBetween(
                    'price', [150, 200],
                )
            })
            .then((info) => {
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
displayService.sort({
    category: ['Sports', 'Art'],
}).then((info) => console.log(info))