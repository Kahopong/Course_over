const port = 8000;

//require classes
//================
const {
    BookRouter,
    HostRouter,
    InfoRouter,
    MyCourseRouter,
    ViewRouter
} = require('./Routers');

const {
    BookService,
    HostService,
    InfoService,
    MyCourseService,
} = require('./Services')


//Configure knex
//===============
const knexFile = require('./knexfile').development;
const knex = require('knex')(knexFile);

//Configure express, handlebars
//=============================
const express = require('express')
const { engine } = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session')
const passport = require('passport')

const app = express()
app.set('view engine', 'handlebars')
app.engine('handlebars', engine({ defaultLayout: 'main' }))

require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(flash())


app.use(express.static(__dirname + '/public'));
app.use(passport.initialize())
app.use(passport.session())
const cors = require("cors");


// Passport Authentication
//==================================
const passportJs = require('./Authentication/passport')


// Set up Server and Routers
//==================================

const noteService = new NoteService(knex);
const noteRouter = new NoteRouter(noteService, express)
app.use("/api/notes", noteRouter.router())
const viewRouter = new ViewRouter(passport, express)
app.use("/", viewRouter.router())



app.get("/", (req, res) => {
    res.render('firstPage')
});


// Listen to port
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});

module.exports = app