class DisplayRouter {
    constructor(displayService, express) {
        this.displayService = displayService;
        this.express = express
    }

    router() {
        let router = this.express.Router();
        router.get('/', this.get.bind(this))
        router.post('/', this.post.bind(this))
        return router;
    }

    // Displaying  ALL Courses
    // ==================================
    get(req, res) {
        return (this.displayService.list()
            .then((data) => {
                res.json(data)
            })
            .catch((err) => {
                res.status(500)
                return res.json(err)
            }));
    }


    // Sorting Courses
    // ==================================
    post(req, res) {
        return (this.displayService.sort(req.body.sorting)
            .then((data) => {
                res.json(data)
            })
            .catch((err) => {
                res.status(500)
                return res.json(err)
            }));
    }

}

module.exports = DisplayRouter;