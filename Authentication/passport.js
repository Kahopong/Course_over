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
    passport.use('local-login', new LocalStrategy(async(username, password, done) => {
        try {
            let users = await knex('users').where({ username: username })
            if (users.length === 0) {
                return done(null, false, { message: 'Try Again! This user is not found!' })
            }
            let user = users[0]
            let result = await hashFunctions.checkPassword(password, user.password)
            if (result) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Incorrect Password!' })
            }
        } catch (err) {
            if (err) {
                done(err)
            }
        }
    }))
}

function localSignup() {
    passport.use('local-signup', new LocalStrategy(async(username, password, done) => {
        try {
            let users = await knex('users').where({ username: username })
            if (users.length !== 0) {
                return done(null, false, { message: 'This Account is already being used!' })
            }
            let hash = await hashFunctions.hashPassword(password)

            const newUser = {
                username: username,
                password: hash
            }

            let userId = await knex('users').insert(newUser).returning('id')
            newUser.id = userId[0]
            done(null, newUser, { message: `Hey ${newUser.username}! You can now login to use the death note!` })


        } catch (err) {
            if (err) {
                done(err)
            }
        }
    }));
}

function serialize() {
    passport.serializeUser((user, done) => {
        done(null, user)
    })
}

function deserialize() {
    passport.deserializeUser((user, done) => {
        done(null, user)
    });
}

module.exports = localLogin()
module.exports = localSignup()
module.exports = serialize()
module.exports = deserialize()