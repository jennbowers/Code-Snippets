const express = require('express');
const mustache = require('mustache');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const bodyParser = require('body-parser');
const parseurl = require('parseurl');
const crypto = require('crypto');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const routes = require('./routes');

// mongoose
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const env = process.env.NODE_ENV || "development";
const mongoURL = require('./config.json')[env].mongoURL;
mongoose.connect(mongoURL);

// models
const Snippets = require('./models/snippets');
const Users = require('./models/users');

// controllers
const createController = require('./controllers/create');
const detailController = require('./controllers/detail');
const indexController = require('./controllers/index');
const welcomeController = require('./controllers/welcome');

// express
const app = express();

// mustache
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

// views
app.set('views', './views');

// body parser
app.use(bodyParser.json());
app.use((bodyParser.urlencoded({extended: false})));

// passport setup
passport.use(new BasicStrategy(
  (username, password, done) => {
    Users.findOne({username: username, password: password}).then(function(user) {
      if(!user) {
        return done(null, false);
      } else {
        return done(null, username);
      }
    });
  }
));

// ----MIDDLEWARE
// session
app.use(session({
  secret: 'Covfefe'
  , resave: false
  , saveUninitialized: false
}));

routes(app);

app.listen(3000, () => {
  console.log('Successfully started express application');
});


module.exports = app;
