//******** View Router *********
//================================
const auth = require('../Authentication/auth')
class ViewRouter {
    constructor(passport, express) {
        this.passport = passport;
        this.express = express
    }


    router() {
        let router = this.express.Router();

        //Login Signup handlebars

        router.get('/login', (req, res) => {
            res.render('login/login', {
                message: req.flash('success'),
                layout: 'login_main'
            })
        })

     
        router.get('/signup', (req, res) => {
            res.render('signup')
        })

        router.get('/shopsignup', (req, res) => {
            res.render('shopsignup')
        })

        router.get('/error', (req, res) => {
            res.render('error', {
                error: req.flash('error')
            })
        })

        router.get('/index', auth.isLoggedIn, (req, res) => {
            console.log(`${req.session.passport.user.username} logged in`)
            res.render('usershb/index', {
                user: req.session.passport.user.username,
                layout: 'users_main'
            })
        })

        router.post('/signup', this.passport.authenticate('local-signup', {
            successFlash: true,
            successRedirect: '/login',
            failureRedirect: '/error',
            failureFlash: true,
        }))

        router.post('/shopsignup', this.passport.authenticate('local-signup2', {
            successFlash: true,
            successRedirect: '/login',
            failureRedirect: '/error',
            failureFlash: true,
        }))

        router.post('/login', this.passport.authenticate('local-login', {
            successRedirect: '/index',
            failureRedirect: '/login',
            failureFlash: true,
        }))

        router.get('/logout', (req, res) => {
            console.log('logging out')
            req.logout();
            res.redirect('/')
        })

        //Shop side handlebars (default)
        router.get('/dashboard', (req, res) => {
            res.render('shophb/dashboard')
        })

        router.get('/edit_shop_info', (req, res) => {
            res.render('shophb/edit_shop_info')
        })

        router.get('/add_course', (req, res) => {
            res.render('shophb/add_course')
        })

        router.get('/edit_course', (req, res) => {
            res.render('shophb/edit_course')
        })

        router.get('/list_booking', (req, res) => {
            res.render('shophb/list_booking')
        })

        //User side handlebars
        // res.render('__FILL_ME_IN__', { layout: 'users_main' })


        return router;
    }
}

module.exports = ViewRouter;