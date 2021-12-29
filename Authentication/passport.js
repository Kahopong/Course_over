const express = require('express')
const app = express()
const passport = require('passport')
app.use(passport.initialize())
app.use(passport.session())

const LocalStrategy = require('passport-local').Strategy;
const hashFunctions = require('../bcrypt')

const knexFile = require('../knexfile').development;
const knex = require('knex')(knexFile);


function localLogin() {



    passport.use('local-login', new LocalStrategy({ passReqToCallback: true }, async(req, username, password, done) => {
        if (req.body.host == "true") {
            try {
                console.log("3222221")
                let shops = await knex('shop_login').where({ email: username })
                if (shops.length === 0) {
                    return done(null, false, { message: 'Try Again! This user is not found!' })
                }
                let shop = shops[0]
                if (shop.password === password) {
                    return done(null, shop);
                } else {
                    return done(null, false, { message: 'Incorrect credentials321.' });
                }
                // let result = await hashFunctions.checkPassword(password, user.password)
                // if (result) {
                //     return done(null, user)
                // } else {
                //     return done(null, false, { message: 'Incorrect Password!' })
                // }

            } catch (err) {

                return done(err)

            }

        } else {
            try {
                console.log("3222221")
                console.log('body:', req.body);
                let users = await knex('user_login').where({ email: username })
                if (users.length === 0) {
                    return done(null, false, { message: 'Try Again! This user is not found!' })
                }
                let user = users[0]
                if (user.password === password) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Incorrect credentials31.' });
                }
                // let result = await hashFunctions.checkPassword(password, user.password)
                // if (result) {
                //     return done(null, user)
                // } else {
                //     return done(null, false, { message: 'Incorrect Password!' })
                // }

            } catch (err) {

                return done(err)

            }
        }


    }))

    passport.serializeUser((user, done) => {
        // console.log("Serialize:Passport generates token, puts it in cookie and sends to browser:", user);
        done(null, user.id);
    });

    passport.deserializeUser(async(id, done) => {
        // console.log("Deserialize: server will take token from your browser, and run this function to check if user exists");
        let users = await knex('users').where({ id: id });
        if (users.length == 0) {
            return done(new Error(`Wrong user id ${id}`));
        }
        let user = users[0];
        return done(null, user);
    });
}




function localSignup() {
    passport.use('local-signup', new LocalStrategy({ passReqToCallback: true }, async(req, username, password, done) => {
        console.log(req.body);
        try {
            let users = await knex('user_login').where({ email: username })
            if (users.length !== 0) {
                console.log("test1")
                return done(null, false, { message: 'This Account is already being used!' })
            }
            // let hash = await hashFunctions.hashPassword(password)
            console.log("test2")
            const newUser = {
                username: req.body.uname,
                surname: req.body.sname,
                firstName: req.body.fname,
                tel: req.body.tel,
                dob: req.body.dob,
                sex: req.body.sex
            }
            let userId = await knex('users').insert(newUser).returning('id')
            console.log(userId)
            const newUserlogin = {
                email: username,
                password: password,
                users_id: userId[0]

            }

            let userloginId = await knex('user_login').insert(newUserlogin).returning('id')
            newUserlogin.id = userloginId[0]

            done(null, newUserlogin, { message: `Hey ${newUserlogin.username}! You can now login to use the death note!` })


        } catch (err) {
            if (err) {
                done(err)
            }
        }
    }));
}



module.exports = localLogin()

module.exports = localSignup()
    // module.exports = serialize()
    // module.exports = deserialize()