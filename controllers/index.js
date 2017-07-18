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
  renderAPIIndex: (req, res) => {
    var context = {
      loggedIn: true,
      name: req.session.username,
      userId: req.session.userId,
    };
    Snippets.find({username: req.session.username}).then((allUserSnippets) => {
      context.displaySnippets = allUserSnippets;
      res.status(200).json(allUserSnippets);
    });
  },
  searchLanguageIndex: (req, res) => {
    var context = {
      loggedIn: true,
      name: req.session.username,
      userId: req.session.userId,
    };
    Snippets.find({username: req.session.username, language: req.body.searchLanguage}).then((allSearchedSnippets) => {
      context.displaySnippets = allSearchedSnippets;
      res.render('index', context);
    });
  },
  searchAPILanguageIndex: (req, res) => {
    var context = {
      loggedIn: true,
      name: req.session.username,
      userId: req.session.userId,
    };
    Snippets.find({username: req.session.username, language: req.body.searchLanguage}).then((allSearchedSnippets) => {
      context.displaySnippets = allSearchedSnippets;
      res.status(200).json(allSearchedSnippets);
    });
  },
  searchTagsIndex: (req, res) => {
    var context = {
      loggedIn: true,
      name: req.session.username,
      userId: req.session.userId,
    };
    Snippets.find({username: req.session.username, tags: {$elemMatch: {tagName: req.body.searchTags}}}).then((allSearchedSnippets) => {
      context.displaySnippets = allSearchedSnippets;
      res.render('index', context);
    });
  },
  searchAPITagsIndex: (req, res) => {
    var context = {
      loggedIn: true,
      name: req.session.username,
      userId: req.session.userId,
    };
    Snippets.find({username: req.session.username, tags: {$elemMatch: {tagName: req.body.searchTags}}}).then((allSearchedSnippets) => {
      context.displaySnippets = allSearchedSnippets;
      res.status(200).json(allSearchedSnippets);
    });
  }

};
