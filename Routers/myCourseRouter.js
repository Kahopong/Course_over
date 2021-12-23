class MyCourseRouter {
    constructor(myCourseService, express) {
        this.myCourseService = myCourseService;
        this.express = express
    }

    router() {
        let router = this.express.Router();
        router.get('/users/book/user_id', this.getbook.bind(this))
        router.get('/users/fav/:user_id', this.getfav.bind(this))
        // example
        // router.get('/', this.get.bind(this))

        return router;
    }

    // GET Method
    // ==================================
    getbook(req, res) {
        return (this.bookService.listbooking(req.params.user_id).then((data) => {
            res.json(data)
        }).catch((err) => {
            res.status(500)
            return res.json(err)
        }))
    }

    getfav(req, res) {
        return (this.bookService.listfav(req.params.user_id).then((data) => {
            res.json(data)
        }).catch((err) => {
            res.status(500)
            return res.json(err)
        }))
    }
    

    // POST Method
    // ==================================
    post(req, res) {

    }

    // PUT Method
    // ==================================
    put(req, res) {

    }

    // DELETE Method
    // ==================================
    delete(req, res) {

    }
}

module.exports = MyCourseRouter;