class MyCourseRouter {
  constructor(myCourseService, express) {
    this.myCourseService = myCourseService;
    this.express = express;
  }

  router() {
    let router = this.express.Router();
    router.get("/users/book", this.getbook.bind(this));
    router.get("/users/fav", this.getfav.bind(this));
    // example
    // router.get('/', this.get.bind(this))

    return router;
  }

  // GET Method
  // ==================================
  getbook(req, res) {
    console.log("user", req.user);
    return this.myCourseService
      .listbooking("1")
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500);
        return res.json(err);
      });
  }

  getfav(req, res) {
    return this.myCourseService
      .listfav("1")
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500);
        return res.json(err);
      });
  }

  // POST Method
  // ==================================
  post(req, res) {}

  // PUT Method
  // ==================================
  put(req, res) {}

  // DELETE Method
  // ==================================
  delete(req, res) {}
}

module.exports = MyCourseRouter;
