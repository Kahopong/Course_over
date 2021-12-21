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
      .then((info) => {
        if (info.length > 0) {
          return this.knex("course")
            .join("course", "shop", "=", "course.shop")
            .select("*")
            .where("shop.id", id);
        } else {
          throw new Error("Shop not existing, cannot list course.");
        }
      });
  }

  addCourse(
    id,
    shop_id,
    title,
    category,
    date,
    timeStart,
    timeEnd,
    price,
    quota,
    ageRange
  ) {
    let query = this.knex.select("id").from("shop").where("id", id);

    return query.then((data) => {
      console.log("Add course", data);
      if (data.length === 1) {
        return this.knex
          .insert({
            shop_id: data[0].id,
            title: title,
            category: category,
            date: date,
            timeStart: timeStart,
            timeEnd: timeEnd,
            price: price,
            quota: quota,
            ageRange: ageRange,
            listing: true,
            confirm: false,
          })
          .into("course");
      } else {
        throw new Error(`Cannot add a course when the user doesn't exist!`);
      }
    });
  }

  editCourse(id, edit) {
    return this.knex("course")
      .select("*")
      .where("id", id)
      .then((info) => {
        if (info.length > 0) {
          return this.knex("course").where("id", id).update({
            title: edit.title,
            category: edit.category,
            date: edit.date,
            timeStart: edit.timeStart,
            timeEnd: edit.timeEnd,
            price: edit.price,
            quota: edit.quota,
            ageRange: edit.ageRange,
            listing: edit.listing,
            confirm: edit.confirm,
          });
        } else {
          throw new Error("Shop not existing, cannot edit info.");
        }
      });
  }

  // Remove method
  remove(id, shop_id) {
    let query = this.knex.select("id").from("shop").where("id", shop_id);

    return query.then((rows) => {
      if (rows.length === 1) {
        return this.knex("course").where("id", id).del();
      } else {
        throw new Error(`Cannot remove a course when the shop doesn't exist!`);
      }
    });
  }
}

module.exports = HostService;

//For trying individual js files

const knexFile = require("../knexfile").development;
const knex = require("knex")(knexFile);
let hostService = new HostService(knex);
