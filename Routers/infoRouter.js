class InfoRouter {
    constructor(infoService, express) {
        this.infoService = infoService;
        this.express = express;
    }

    router() {
        let router = this.express.Router();
        router.get("/users", this.getUsers.bind(this));
        router.get("/shop", this.getShop.bind(this));
        router.put("/users", this.putUsers.bind(this));
        router.put("/shop", this.putShop.bind(this));

        return router;
    }

  // GET Users Info
  // ==================================
  getUsers(req, res) {
    if(req.session.passport!= undefined){
      return this.infoService
      .listUser(req.session.passport.user.users_id)
      .then((data) => {
        res.json(data);
      }).catch((err) => {
        res.status(500);
        return res.json(err);
      });
    }else{
      this.infoService
      .listUser(1)
      .then((data) => {
        res.json('no');
      }).catch((err) => {
        res.status(500);
        return res.json(err);
      });
    }
    
      
  }

    // GET Shop Info
    // ==================================
    getShop(req, res) {
        return this.infoService
            .listShop(req.session.passport.user.shop_id)
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                res.status(500);
                return res.json(err);
            });
    }

    // Edit Users Info
    // ==================================
    putUsers(req, res) {
        return this.infoService
            .editUser(req.session.passport.user.users_id, req.body.edit)
            .then(() => this.infoService.listUser(req.session.passport.user.users_id))
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                res.status(500);
                return res.json(err);
            });
    }

    // Edit Shop Info
    // ==================================
    putShop(req, res) {
        return this.infoService
            .editShop(req.session.passport.user.shop_id, req.body.edit)
            .then(() => this.infoService.listShop(req.session.passport.user.shop_id))
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                res.status(500);
                return res.json(err);
            });
    }
}

module.exports = InfoRouter;