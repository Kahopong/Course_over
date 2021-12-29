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

        router.get('/login', (req, res) => {
            res.render('login', {
                error: req.flash('error')
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
            res.render('index', { user: req.session.passport.user.username })
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
        return router;
    }
}

module.exports = ViewRouter;