class ImageRouter {
    constructor(imageService, express) {
        this.imageService = imageService;
        this.express = express
    }

    router() {
        let router = this.express.Router();
        router.post('/:courseId', this.post.bind(this))
            // router.delete('/users/:courseId', this.delete.bind(this))

        return router;
    }

    // Upload Image
    // ==================================
    post(req, res) {
        return (this.imageService.writeFile(req.params.courseId, req.files.upload)
            .then(() => {
                console.log('uploaded')
                return res.redirect('/dashboard')
            })
            .catch((err) => {
                res.status(500)
                console.log(err)
                return res.json(err)
            }));
    }
}

module.exports = ImageRouter;