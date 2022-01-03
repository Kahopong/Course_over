class BookService {
  constructor(knex) {
    this.knex = knex;
  }

  book(users_id, course_id) {
    return this.knex("user_booking")
      .select("*")
      .where({ users_id: users_id, course_id: course_id })
      .then((info) => {
        if (info.length == 0) {
          return this.knex("user_booking").insert({
            users_id: users_id,
            course_id: course_id,
            paid: true,
          });
        } else {
          throw new Error("User booking already exists.");
        }
      });
  }

  unbook(users_id, course_id) {
    return this.knex("user_booking")
      .select("*")
      .where({ users_id: users_id, course_id: course_id })
      .then((info) => {
        if (info.length > 0) {
          return this.knex("user_booking")
            .where({
              users_id: users_id,
              course_id: course_id,
            })
            .del();
        } else {
          throw new Error("Cannot unbook, user booking does not exist.");
        }
      });
  }

  list(course_id) {
    return this.knex("course")
      .select("*")
      .where({ id: course_id })
      .then((info) => {
        if (info.length > 0) {
          return this.knex("user_booking")
            .select(
              "user_booking.*",
              "username",
              "surname",
              "firstName",
              "tel",
              "sex",
              "dob"
            )
            .join("users", "user_booking.users_id", "users.id")
            .where({ course_id: course_id });
        } else {
          throw new Error("Course does not exist.");
        }
      });
  }

  listbooked(users_id, course_id) {
    return this.knex("user_booking")
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

module.exports = BookService;

//For trying individual js files

const knexFile = require("../knexfile").development;
const knex = require("knex")(knexFile);
let bookService = new BookService(knex);

// bookService.book(1, 5).then(() => knex('user_booking').select('*')).then((data) => console.log(data))
// bookService.unbook(1, 5).then(() => knex('user_booking').select('*')).then((data) => console.log(data))
// bookService.book(1, 6).then(() => bookService.list(6)).then((data) => console.log(data))
// bookService.unbook(1, 6).then(() => bookService.list(6)).then((data) => console.log(data))
// bookService.list(2).then((data) => console.log(data))
// bookService.listbooked(1, 5).then((data) => console.log(data));
