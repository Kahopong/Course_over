//fav , unfav

class FavService {
  constructor(knex) {
    this.knex = knex;
  }

  fav(users_id, course_id) {
    return this.knex("user_favorite")
      .select("*")
      .where({ users_id: users_id, course_id: course_id })
      .then((info) => {
        if (info.length == 0) {
          return this.knex("user_favorite").insert({
            users_id: users_id,
            course_id: course_id,
          });
        } else {
          throw new Error("User favorite record already exists.");
        }
      });
  }

  unfav(users_id, course_id) {
    return this.knex("user_favorite")
      .select("*")
      .where({ users_id: users_id, course_id: course_id })
      .then((info) => {
        if (info.length > 0) {
          return this.knex("user_favorite")
            .where({
              users_id: users_id,
              course_id: course_id,
            })
            .del();
        } else {
          throw new Error("Cannot unfav, user favorite record does not exist.");
        }
      });
  }

  getfav(users_id, course_id) {
    return this.knex("user_favorite")
      .select("*")
      .where({ users_id: users_id, course_id: course_id })
      .then((info) => {
        if (info.length > 0) {
          return info;
        } else {
          return false;
        }
      });
  }
}

module.exports = FavService;

//For trying individual js files

// const knexFile = require('../knexfile').development;
// const knex = require('knex')(knexFile);
// let favService = new FavService(knex);
