class FavRouter {
    constructor(favService, express) {
        this.favService = favService;
        this.express = express
    }

    router() {
        let router = this.express.Router();
        // example
        // router.get('/', this.get.bind(this))

        return router;
    }

    // GET Method
    // ==================================
    get(req, res) {

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

module.exports = FavRouter;