// models
const Snippets = require('../models/snippets');
const Users = require('../models/users');

module.exports = {
  sanityTest: (req, res) => {
    res.json({hello: 'Jenn'});
  },
  renderWelcome: (req, res) => {
    req.session.username = '';
    res.render('welcome', {});
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
      Users.findOne({username: inputUsername}).then((user) => {
        if (user) {
          if(user.password === inputPassword) {
            res.session.username = inputUsername;
            res.session.userId = user._id;
            res.redirect('index');
          } else {
            context.loginMsg = 'Incorrect Credentials, Please Try Again';
            res.render('welcome', context);
          }
        } else if (!user) {
          context.loginMsg = 'Incorrect Credentials, Please Try Again';
          res.render('welcome', context);
        }
      });
    } else if (!inputUsername || !inputPassword) {
      context.loginMsg = 'Please Enter All Information';
      res.render('welcome', context);
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
      createUser(inputUsername, inputPassword);
      User.findOne({username: inputUsername}).then((user) => {
        req.session.username = user.username;
        req.session.userId = user._id;
        res.redirect('/index', context);
      });
    } else if (!inputUsername || !inputPassword) {
      context.signupMsg = 'Please Enter All Information';
      res.render('welcome', context);
    }

  }
};
