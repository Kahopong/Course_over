class ImageRouter {
    constructor(imageService, express) {
        this.imageService = imageService;
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
        return (this.imageService.fav(req.session.passport.user.users_id, req.params.courseId)
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
        return (this.imageService.unfav(req.session.passport.user.users_id, req.params.courseId)
            .then((data) => {
                res.json(data)
            })
            .catch((err) => {
                res.status(500)
                return res.json(err)
            }));
    }
}

module.exports = ImageRouter;