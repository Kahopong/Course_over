class FavRouter {
    constructor(favService, express) {
        this.favService = favService;
        this.express = express
    }

    router() {
        let router = this.express.Router();
        router.post('/users/:courseId', this.post.bind(this))
        router.delete('/users/:courseId', this.delete.bind(this))

        return router;
    }

    // Fav a course by user
    // ==================================
    post(req, res) {
        return (this.favService.fav(1, req.params.courseId)
            .then((data) => {
                res.json(data)
            })
            .catch((err) => {
                res.status(500)
                return res.json(err)
            }));
    }

    //  Unfav a course by user
    // ==================================
    delete(req, res) {
        return (this.favService.unfav(1, req.params.courseId)
            .then((data) => {
                res.json(data)
            })
            .catch((err) => {
                res.status(500)
                return res.json(err)
            }));
    }
}

module.exports = FavRouter;