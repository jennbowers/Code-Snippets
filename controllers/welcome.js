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
    let msg = '';
    if(inputUsername && inputPassword) {
      Users.findOne({username: inputUsername}).then((user) => {
        if (user) {
          if(user.password === inputPassword) {
            res.redirect('index');
          } else {
            msg = 'Incorrect Credentials, Please Try Again';
            res.render('welcome', msg);
          }
        } else if (!user) {
          msg = 'Incorrect Credentials, Please Try Again';
          res.render('welcome', msg);
        }
      });
    } else if (!inputUsername || !inputPassword) {
      msg = 'Please Enter All Information';
      res.render('welcome', msg);
    }
  }
};
