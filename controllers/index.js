// models
const Snippets = require('../models/snippets');
const Users = require('../models/users');

module.exports = {
  renderIndex: (req, res) => {
    var context = {
      loggedIn: true,
      name: req.session.username,
      userId: req.session.userId,
    };
    Snippets.find({username: req.session.username}).then((allUserSnippets) => {
      context.displaySnippets = allUserSnippets;
      res.render('index', context);
    });
  },

};
