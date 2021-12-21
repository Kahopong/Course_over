class HostRouter {
  constructor(hostService, express) {
    this.hostService = hostService;
    this.express = express;
  }

  router() {
    let router = this.express.Router();
    // example
    // router.get('/', this.get.bind(this))
    router.get("/shop", this.get.bind(this));
    router.post("/shop", this.post.bind(this));
    router.put("/shop/:courseId", this.put.bind(this));
    router.delete("/shop/:courseId", this.delete.bind(this));
    return router;
  }

  // GET Method
  // ==================================
  get(req, res) {
    return this.hostService
      .listCourse(req.)
      .then((courseArr) => {
        let course = courseArr.map((a) => a["course"]);
        res.json(course);
      })
      .catch((err) => {
        res.status(500);
        return res.json(err);
      });
  }

  // POST Method
  // ==================================
  post(req, res) {}

  // PUT Method  req.params.courseId
  // ==================================
  put(req, res) {}

  // DELETE Method  req.params.courseId
  // ==================================
  delete(req, res) {}
}

module.exports = HostRouter;
