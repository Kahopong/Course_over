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
        return this.myCourseService
            .listbooking(req.session.passport.user.users_id)
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
            .listfav(req.session.passport.user.users_id)
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                res.status(500);
                return res.json(err);
            });
    }


}

module.exports = MyCourseRouter;