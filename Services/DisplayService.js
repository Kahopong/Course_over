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

    listcourse(id) {
            return this.knex("course").select("*").where({ id: id }).then((info) => {
                if (info.length == 0) {
                    throw new Error('No Courses to display')
                } else {
                    return info
                }
            })
        }
        // list() {
        //     let query = this.knex
        //     .select("*")
        //     .from("course")
        //     .innerJoin("shop", "course.shop_id", "shop.id")
        //     .orderBy("course.id", "asc")

    //             return query.then((rows) => {
    //                 if(rows.length > 0){
    //                 console.log(rows, "pp");
    //                 return rows.map((row) => ({
    //                   WorkN: row.title,
    //                   Cate: row.category,
    //                   TimeS: row.timeStart,
    //                   TimeE: row.timeEnd,
    //                   Pric: row.price,
    //                 }));
    //               }else{
    //                 throw new Error('No Courses to display')
    //               }
    //         })
    //     }



    sort(sorting) {
        return this.knex('course').select('*')
            .where('ageRange', 'like', `%${sorting.age}%`)
            .whereIn('category', sorting.category)
            .whereBetween('price', sorting.price.map((a) => parseInt(a)))
            .then((info) => {
                if (info.length == 0) {
                    return ('Sorry! We currently have no courses matching your filter criteria!')
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
// displayService.sort({
//     category: ['Sports', 'Art'],
// }).then((info) => console.log(info))