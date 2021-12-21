class BookRouter {
    constructor(bookService, express) {
        this.bookService = bookService;
        this.express = express
    }

    router() {
        let router = this.express.Router();
        router.post('/users/:courseId', this.post.bind(this))
        router.delete('/users/:courseId', this.delete.bind(this))
        router.get('/shop/:courseId', this.get.bind(this))

        return router;
    }

    // Book a course by user
    // ==================================
    post(req, res) {
        return (this.bookService.book(1, req.params.courseId)
            .then((data) => {
                res.json(data)
            })
            .catch((err) => {
                res.status(500)
                return res.json(err)
            }));
    }

    //  Unbook a course by user
    // ==================================
    delete(req, res) {
        return (this.bookService.unbook(1, req.params.courseId)
            .then((data) => {
                res.json(data)
            })
            .catch((err) => {
                res.status(500)
                return res.json(err)
            }));
    }


    //  List all users who booked a courses 
    // ====================================
    get(req, res) {
        return (this.bookService.list(req.params.courseId).then((data) => {
            res.json(data)
        }).catch((err) => {
            res.status(500)
            return res.json(err)
        }))
    }

}

module.exports = BookRouter;