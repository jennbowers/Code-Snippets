// models
const Snippets = require('../models/snippets');
const Users = require('../models/users');

module.exports = {
  renderDetail: (req, res) => {
    var context = {
      loggedIn: true,
      name: req.session.username,
      userId: req.session.userId,
    };
    Snippets.find({_id: req.params.id}).then((snippet) => {
      context.displaySnippets = snippet;
      res.render('detail', context);
    });
  },
  renderAPIDetail: (req, res) => {
    var context = {
      loggedIn: true,
    };
    Snippets.find({title: 'testing1'}).then((snippet) => {
      res.status(200).json(snippet);
    });
  }
};
