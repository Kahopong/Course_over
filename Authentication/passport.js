const express = require("express");
const app = express();
const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());

const LocalStrategy = require("passport-local").Strategy;
const hashFunctions = require("../bcrypt");

const knexFile = require("../knexfile").development;
const knex = require("knex")(knexFile);

function localLogin() {
    passport.use(
        "local-login",
        new LocalStrategy({ passReqToCallback: true },
            async(req, username, password, done) => {
                if (req.body.host == "true") {
                    try {

                        let shops = await knex("shop_login").where({ email: username });
                        if (shops.length === 0) {
                            return done(null, false, {
                                message: "Try Again! This shop user is not found!",
                            });
                        }
                        let shop = shops[0];
                        // console.log('shops', shops)
                        if (shop.password === password) {
                            return done(null, shop);
                        } else {
                            return done(null, false, {
                                message: "The password is wrong!",
                            });
                        }

                    } catch (err) {
                        return done(err);
                    }
                } else {
                    //User login
                    try {
                        let users = await knex("user_login").where({ email: username });
                        if (users.length === 0) {
                            return done(null, false, {
                                message: "Try Again! This user is not found!",
                            });
                        }
                        // console.log('users', users)
                        let user = users[0];
                        if (user.password === password) {
                            user.isUser = true;
                            // console.log(user)
                            return done(null, user);
                        } else {
                            return done(null, false, { message: "The password is wrong!" });
                        }
                        // let result = await hashFunctions.checkPassword(password, user.password)
                        // if (result) {
                        //     return done(null, user)
                        // } else {
                        //     return done(null, false, { message: 'Incorrect Password!' })
                        // }
                    } catch (err) {
                        return done(err);
                    }
                }
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        return done(null, user);
    });
}

function localSignup() {
    passport.use('local-signup', new LocalStrategy({ passReqToCallback: true }, async(req, username, password, done) => {
        // console.log(req.body);
        try {
            let users = await knex('user_login').where({ email: username })
            if (users.length !== 0) {
                // console.log("test1")
                return done(null, false, { message: 'This Account is already being used!' })
            }
            // let hash = await hashFunctions.hashPassword(password)
            // console.log("test2")
            const newUser = {
                username: req.body.uname,
                surname: req.body.sname,
                firstName: req.body.fname,
                tel: req.body.tel,
                dob: req.body.dob,
                sex: req.body.sex
            }
            let userId = await knex('users').insert(newUser).returning('id')
                // console.log(userId)
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
                done(err);
            }
        }
    }));
}

function localSignup2() {
    passport.use('local-signup2', new LocalStrategy({ passReqToCallback: true }, async(req, username, password, done) => {
        // console.log(req.body);
        try {
            let users = await knex('shop_login').where({ email: username })
            if (users.length !== 0) {
                // console.log("test3")
                return done(null, false, { message: 'This Account is already being used!' })
            }
            // let hash = await hashFunctions.hashPassword(password)
            // console.log("test4")
            const newUser = {
                company: req.body.CompanyN,
                tel: req.body.Tel2,
                email: username,

            }
            let userId = await knex('shop').insert(newUser).returning('id')
                // console.log(userId)
            const newUserlogin = {
                email: username,
                password: password,
                shop_id: userId[0]

            }

            let userloginId = await knex('shop_login').insert(newUserlogin).returning('id')
            newUserlogin.id = userloginId[0]

            done(null, newUserlogin, { message: `Hey ${newUserlogin.username}! You can now login to use the death note!` })


        } catch (err) {
            if (err) {
                done(err);
            }
        }
    }));
}

module.exports = localLogin();
module.exports = localSignup2();
module.exports = localSignup();
// module.exports = serialize()
// module.exports = deserialize()