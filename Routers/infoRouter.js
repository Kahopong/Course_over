class InfoRouter {
    constructor(infoService, express) {
        this.infoService = infoService;
        this.express = express
    }

    router() {
        let router = this.express.Router();
        router.get('/users', this.getUsers.bind(this))
        router.get('/shop', this.getShop.bind(this))
        router.put('/users', this.putUsers.bind(this))
        router.put('/shop', this.putShop.bind(this))

        return router;
    }

    // GET Users Info
    // ==================================
    getUsers(req, res) {
        return (this.infoService.listUser(2)
            .then((data) => {
                console.log('hello');
                // console.log(req.session);
                res.json(data);
            })
            .catch((err) => {
                res.status(500)
                return res.json(err)
            }));
    }

    // GET Shop Info
    // ==================================
    getShop(req, res) {
        return (this.infoService.listShop(2)
            .then((data) => {
                res.json(data)
            })
            .catch((err) => {
                res.status(500)
                return res.json(err)
            }));
    }


    // Edit Users Info
    // ==================================
    putUsers(req, res) {
        return (this.infoService
            .editUser(3, req.body.edit)
            .then(() => this.infoService.listUser(3))
            .then((data) => {
                res.json(data)
            })
            .catch((err) => {
                res.status(500)
                return res.json(err)
            })
        )
    }

    // Edit Shop Info
    // ==================================
    putShop(req, res) {
        return (this.infoService
            .editShop(3, req.body.edit)
            .then(() => this.infoService.listShop(3))
            .then((data) => {
                res.json(data)
            })
            .catch((err) => {
                res.status(500)
                return res.json(err)
            })
        );
    }
}

module.exports = InfoRouter;