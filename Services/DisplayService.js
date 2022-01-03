//display courses at home page of users

class DisplayService {
    constructor(knex) {
        this.knex = knex;
    }
    list() {
        return this.knex("course")
            .select("*")
            .where('listing', null)
            .then((info) => {
                if (info.length == 0) {
                    throw new Error("No Courses to display");
                } else {
                    return info;
                }
            });
    }

    listcourse(id) {
        return this.knex("course")
            .select("*")
            .where({ id: id })
            .where('listing', null)
            .then((info) => {
                if (info.length == 0) {
                    throw new Error("No Courses to display");
                } else {
                    return info;
                }
            });
    }

    sort(sorting) {
        return this.knex("course")
            .select("*")
            .where('listing', null)
            .where("ageRange", "like", `%${sorting.age}%`)
            .whereIn("category", sorting.category)
            .whereBetween(
                "price",
                sorting.price.map((a) => parseInt(a))
            )
            .then((info) => {
                if (info.length == 0) {
                    return "Sorry! We currently have no courses matching your filter criteria!";
                } else {
                    return info;
                }
            });
    }

    max() {
        return this.knex("course")
            .max('id')
            .then((info) => {
                if (info.length == 0) {
                    throw new Error("No Courses to display");
                } else {
                    return info;
                }
            });
    }
}

module.exports = DisplayService;

//For trying individual js files

const knexFile = require("../knexfile").development;
const knex = require("knex")(knexFile);
let displayService = new DisplayService(knex);

// displayService.max().then((info) => console.log(info))
// displayService.sort({
//     category: ['Sports', 'Art'],
// }).then((info) => console.log(info))