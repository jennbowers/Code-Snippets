const express = require('express');
const mustache = require('mustache');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const parseurl = require('parseurl');
// const passport = require('passport');
// const BasicStrategy = require('passport-http').BasicStrategy;
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
// passport.use(new BasicStrategy(
//   (username, password, done) => {
//     Users.findOne({username: username, password: password}).then(function(user) {
//       if(!user) {
//         return done(null, false);
//       } else {
//         return done(null, username);
//       }
//     });
//   }
// ));

// password hashing
const createUser = function(username, password) {
  return Users.create({username: username, password: createPasswordHashObject(password)});
};

const createPasswordHashObject = function(password, salt="") {
  salt = salt || crypto.randomBytes(Math.ceil(32 * 3 / 4)).toString('base64')
.slice(0, 8);
  const hash = crypto.pbkdf2Sync(password, salt , 100, 256, 'sha256');
  const hashString = hash.toString('base64');
  return {salt: salt, iterations: 100, hash: hashString};
};

const login = function(username, password) {
  return User.findOne({username: username}).then(function(user) {
    if(!user) {
      return false;
    }
    const pwObject = user.password;
    const newPWObject = createPasswordHashObject(password, pwObject.salt);
    return pwObject.hash === newPWObject.hash;
  });
};

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
