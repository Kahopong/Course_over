const port = 8000;

//require classes
//================

const BookService = require('./services/BookService.js')
const HostService = require('./services/HostService.js')
const InfoService = require('./services/InfoService.js')
const MyCourseService = require('./services/MyCourseService.js')

const BookRouter = require('./routers/BookRouter.js')
const HostRouter = require('./routers/HostRouter.js')
const InfoRouter = require('./routers/InfoRouter.js')
const MyCourseRouter = require('./routers/MyCourseRouter.js')
const ViewRouter = require('./routers/ViewRouter.js')


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
const bookService = new BookService(knex);
const hostService = new HostService(knex);
const infoService = new InfoService(knex);
const myCourseService = new MyCourseService(knex);

app.use("/book", new BookRouter(bookService, express).router())
app.use("/host", new HostRouter(hostService, express).router())
app.use("/info", new InfoRouter(infoService, express).router())
app.use("/myCourse", new MyCourseRouter(myCourseService, express).router())
app.use("/", new ViewRouter(passport, express).router())


app.get("/", (req, res) => {
    res.render('homePage')
});

// Listen to port
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});


module.exports = app