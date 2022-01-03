//******** View Router *********
//================================
const auth = require("../Authentication/auth");
class ViewRouter {
    constructor(passport, express) {
        this.passport = passport;
        this.express = express;
    }

    router() {
        let router = this.express.Router();

        //Login Signup handlebars

        router.get("/login", (req, res) => {
            res.render("login/login", {
                error: req.flash("error"),
                layout: "login_main",
            });
        });

        router.get("/signup", (req, res) => {
            res.render("login/signup", { layout: "login_main" });
        });

        router.get("/shopsignup", (req, res) => {
            res.render("login/shopsignup", { layout: "login_main" });
        });

        router.get("/error", (req, res) => {
            res.render("error", {
                error: req.flash("error"),
            });
        });

        // router.get('/index', auth.isLoggedIn, (req, res) => {
        //     console.log(`${req.session.passport.user.username} logged in`)
        //     res.render('usershb/index', {
        //         user: req.session.passport.user.username,
        //         layout: 'users_main'
        //     })
        // })
        router.get("/index", (req, res) => {
            // console.log("My user is 3 ",  req.session.passport.user)
            if(req.session.passport.user.isUser == true){
                res.render("usershb/index", {
                    layout: "users_main",
                });
            }else {
            res.render("usershb/index", {
                layout: "login_main",
            });
        }
        });

        router.get("/index/course",  (req, res) => {
            if(req.session.passport != undefined && req.session.passport.user.isUser == true){
            res.render("usershb/courseinfo", {
                // user: req.session.passport.user.username,
                layout: "users_main",
            });
            }else {
                res.render("usershb/courseinfo", {
                    layout: "login_main",
                });
            }
        });
        router.get('/logout', function(req, res){
            req.logout();
            res.redirect('/login');
          });

        router.post(
            "/signup",
            this.passport.authenticate("local-signup", {
                successFlash: true,
                successRedirect: "/login",
                failureRedirect: "/error",
                failureFlash: true,
            })
        );

        router.post(
            "/shopsignup",
            this.passport.authenticate("local-signup2", {
                successFlash: true,
                successRedirect: "/login",
                failureRedirect: "/error",
                failureFlash: true,
            })
        );

        // router.post(
        //     "/login",
        //     this.passport.authenticate("local-login", {
        //         successRedirect: "/index",
        //         failureRedirect: "/login",
        //         failureFlash: true,
        //     })
        // );

        let passportCopy = this.passport
        router.post(
            "/login",
            function(req, res, next) {
                passportCopy.authenticate('local-login', function(err, user, info) {
                    if (err) { return next(err); }
                    if (!user) { return res.redirect('/login'); }
                    req.logIn(user, function(err) {
                        if (err) { return next(err); }
                        if (user.isUser == true) {
                            return res.redirect("/index");
                        } else {
                            return res.redirect('/dashboard');
                        }
                    });
                })(req, res, next);
            });

        router.get("/logout", (req, res) => {
            console.log("logging out");
            req.logout();
            res.redirect("/");
        });

        //Shop side handlebars (default)
        router.get("/dashboard", auth.isLoggedIn,(req, res) => {
            // console.log('passportDB', req.session.passport.user.shop_id)
            res.render("shophb/dashboard", { name: "Fanki" });
        });

        router.get("/edit_shop_info",auth.isLoggedIn, (req, res) => {
            res.render("shophb/edit_shop_info"), { name: "Fanki" };
        });

        router.get("/add_course",auth.isLoggedIn, (req, res) => {
            res.render("shophb/add_course"), { name: "Fanki" };
        });

        router.get("/edit_course",auth.isLoggedIn, (req, res) => {
            res.render("shophb/edit_course"), { name: "Fanki" };
        });

        router.get("/list_booking", auth.isLoggedIn,(req, res) => {
            res.render("shophb/list_booking"), { name: "Fanki" };
        });

        //User side handlebars
        // res.render('__FILL_ME_IN__', { layout: 'users_main' })
        router.get("/mycourse",auth.isLoggedIn, (req, res) => {
            res.render("usershb/mycourse", { name: "Fanki", layout: "users_main" });
        });

        router.get("/edit_member_info", auth.isLoggedIn,(req, res) => {
            res.render("usershb/edit_member_info", {
                name: "Fanki",
                layout: "users_main",
            });
        });

        return router;
    }
}

module.exports = ViewRouter;