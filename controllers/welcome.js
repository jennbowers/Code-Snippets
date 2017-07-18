const app = require('../app');
const crypto = require('crypto');
const session = require('express-session');


// models
const Snippets = require('../models/snippets');
const Users = require('../models/users');

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
  return Users.findOne({username: username}).then(function(user) {
    if(!user) {
      return false;
    }
    const pwObject = user.password;
    const newPWObject = createPasswordHashObject(password, pwObject.salt);
    return pwObject.hash === newPWObject.hash;
  });
};


module.exports = {
  sanityTest: (req, res) => {
    res.json({hello: 'Jenn'});
  },
  renderWelcome: (req, res) => {
    req.session.username = '';
    res.render('welcome', {});
  },
  renderAPIWelcome: (req, res) => {
    req.session.username = '';
    res.status(200).json({});
  },
  loginWelcome: (req, res) => {
    let inputUsername = req.body.username;
    let inputPassword = req.body.password;
    let context = {
      sessionUsername: req.session.username,
      sessionUserId: req.session.userId,
      loginMsg: ''
    };
    if(inputUsername && inputPassword) {
      login(inputUsername, inputPassword).then(() => {
        if (false) {
          context.loginMsg = 'Incorrect Credentials, Please Try Again';
          res.render('welcome', context);
        }
        Users.findOne({username: inputUsername}).then((user) => {
          req.session.username = inputUsername;
          req.session.userId = user._id;
          res.redirect('/index');
        });
      });
    } else if (!inputUsername || !inputPassword) {
      context.loginMsg = 'Please Enter All Information';
      res.render('welcome', context);
    }
  },
  loginAPIWelcome: (req, res) => {
    let inputUsername = req.body.username;
    let inputPassword = req.body.password;
    let context = {
      loginMsg: ''
    };
    if(inputUsername && inputPassword) {
      login(inputUsername, inputPassword).then(() => {
        if (false) {
          context.loginMsg = 'Incorrect Credentials, Please Try Again';
          res.status(401).json(context);
        }
        Users.findOne({username: inputUsername}).then((user) => {
          res.status(201).json(user);
        });
      });
    } else if (!inputUsername || !inputPassword) {
      context.loginMsg = 'Please Enter All Information';
      res.json(context);
    }
  },
  signupWelcome: (req, res) => {
    let inputUsername = req.body.username;
    let inputPassword = req.body.password;
    let context = {
      sessionUsername: req.session.username,
      sessionUserId: req.session.userId,
      signupMsg: ''
    };
    if(inputUsername && inputPassword) {
      console.log('working');
        createUser(inputUsername, inputPassword).then(() => {
          Users.findOne({username: inputUsername}).then((user) => {
            console.log(inputUsername);
            console.log(user);
            req.session.username = user.username;
            req.session.userId = user._id;
            res.redirect('/index');
          });
        });
    } else if (!inputUsername || !inputPassword) {
      console.log('not working');
      context.signupMsg = 'Please Enter All Information';
      res.render('welcome', context);
    }

  }
};
