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
        router.get("/course_para/:courseId", this.getPara.bind(this));
        router.put("/course_para/:courseId", this.putPara.bind(this));
        return router;
    }


    // GET Method - list
    // ==================================
    get(req, res) {
        return this.hostService
            .listCourse(req.session.passport.user.shop_id)
            .then((data) => {
                // console.log(req);
                res.json(data);
            })
            .catch((err) => {
                res.status(500);
                return res.json(err);
            });
    }

    // POST Method
    // ==================================
    post(req, res) {
        return this.hostService
            .addCourse(req.session.passport.user.shop_id, req.body.add)
            .then(() => {
                return this.hostService.listCourse(req.session.passport.user.shop_id);
            })
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                res.status(500);
                return res.json(err);
            });
    }

    // PUT Method
    // ==================================
    put(req, res) {
        return this.hostService
            .editCourse(req.params.courseId, req.body.course, req.session.passport.user.shop_id)
            .then(() => {
                return this.hostService.listCourse(req.session.passport.user.shop_id);
            })
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                res.status(500);
                return res.json(err);
            });
    }

    // DELETE Method
    // ==================================
    delete(req, res) {
        return this.hostService
            .removeCourse(req.session.passport.user.shop_id, req.params.courseId)
            .then(() => {
                return this.hostService.listCourse(req.session.passport.user.shop_id);
            })
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                res.status(500);
                return res.json(err);
            });
    }

    getPara(req, res) {
        return this.hostService
            .listCoursePara(req.params.courseId)
            .then((data) => {
                // console.log(req);
                res.json(data);
            })
            .catch((err) => {
                res.status(500);
                return res.json(err);
            });
    }

    putPara(req, res) {
        return this.hostService
            .editCoursePara(req.params.courseId, req.body.para)
            .then((data) => {
                // console.log(req);
                res.json(data);
            })
            .catch((err) => {
                res.status(500);
                return res.json(err);
            });

    }
}

module.exports = HostRouter;