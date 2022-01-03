//host a course by a shop
//list, add, delete, edit

class HostService {
    constructor(knex) {
        this.knex = knex;
    }

    listCourse(id) {
        return this.knex("course")
            .select("*")
            .where("shop_id", id)
            .then((data) => {
                if (data.length > 0) {
                    return this.knex("course").select("*").where("shop_id", id);
                } else {
                    throw new Error("Shop not existing, cannot list course.");
                }
            });
    }

    addCourse(id, addInfo) {
        return this.knex("shop")
            .select("id")
            .from("shop")
            .where("id", id)
            .then((data) => {
                console.log("Add course", data);
                if (data.length === 1) {
                    return this.knex("course")
                        .insert({
                            shop_id: data[0].id,
                            title: addInfo.title,
                            category: addInfo.category,
                            date: addInfo.date,
                            timeStart: addInfo.timeStart,
                            timeEnd: addInfo.timeEnd,
                            price: addInfo.price,
                            quota: addInfo.quota,
                            ageRange: addInfo.Age,
                        })
                        .returning('id').then((data)=> {
                            console.log(typeof data)
                            if (data > 0){
                                return this.knex("course_para").insert({
                                course_id: data[0],
                                about: addInfo.AboutC,
                                specialNote: addInfo.SpecN
                                })
                            }
                        })
                       
                } else {
                    throw new Error(`Cannot add a course when the user doesn't exist!`);
                }
            });
    }

    editCourse(course_id, edit, id) {
        return this.knex("shop")
            .select("*")
            .where("id", id)
            .then((data) => {
                if (data.length > 0) {
                    return this.knex("course").where("id", course_id).update({
                        title: edit.title,
                        category: edit.category,
                        date: edit.date,
                        timeStart: edit.timeStart,
                        timeEnd: edit.timeEnd,
                        price: edit.price,
                        quota: edit.quota,
                        ageRange: edit.ageRange,
                    });
                } else {
                    throw new Error("Shop not existing, cannot edit info.");
                }
            });
    }

    removeCourse(id, course_id) {
        return this.knex("shop")
            .select("id")
            .from("shop")
            .where("id", id)
            .then((data) => {
                if (data.length === 1) {
                    return this.knex("course").where("id", course_id).update({
                        listing: false,
                    });
                } else {
                    throw new Error(
                        `Cannot remove a course when the shop doesn't exist!`
                    );
                }
            });
    }


    // List Add Edit Course_para
    listCoursePara(id) {
        return this.knex("course_para")
            .select("*")
            .where("course_id", id)
            .then((data) => {
                if (data.length > 0) {
                    return data
                } else {
                    throw new Error("Course not existing, cannot list course.");
                }
            });
    }


    // Add Course Para function missing

    editCoursePara(id, edit) {
        return this.knex("course_para")
            .select("*")
            .where("course_id", id)
            .then((data) => {
                if (data.length > 0) {
                    return this.knex("course_para").where("course_id", id).update({
                        about: edit.about,
                        specialNote: edit.specialNote,
                    });
                } else {
                    throw new Error("Course not existing, cannot edit para.");
                }
            });
    }
}

module.exports = HostService;

//For trying individual js files

const knexFile = require("../knexfile").development;
const knex = require("knex")(knexFile);
let hostService = new HostService(knex);

// hostService.listCourse(1).then((a) => console.log(a));

// let addCourse = {
//   title: `Chinese tutorial I`,
//   category: `School Subjects`,
//   date: `2022-05-22`,
//   timeStart: `10:00:00`,
//   timeEnd: `13:00:00`,
//   price: `100.00`,
//   quota: `4`,
//   ageRange: `13-16`,
// };
// hostService.addCourse(1, addCourse).then(() => {
//   hostService.listCourse(1).then((a) => console.log(a));
// });

// hostService.removeCourse(3, 5).then((data) => console.log(data));

// let editCourse = {
//   title: `sketching`,
//   category: `Art`,
//   date: `2022-01-10`,
//   timeStart: `12:00:00`,
//   timeEnd: `14:00:00`,
//   price: `100.00`,
//   quota: `5`,
//   ageRange: `18-99`,
// };
// hostService.editCourse(4, editCourse, 2).then(() => {
//   hostService.listCourse(2).then((a) => console.log(a));
// });