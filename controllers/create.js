// models
const Snippets = require('../models/snippets');
const Users = require('../models/users');

module.exports= {
  renderCreate: (req, res) => {
    res.render('create', {});
  },
  renderAPICreate: (req, res) => {
    res.status(200).json({});
  },
  addSnippetCreate: (req, res) => {
    var context = {
      loggedIn: true,
      name: req.session.username,
      userId: req.session.userId,
    };
    var title = req.body.title;
    var language = req.body.language;
    var body = req.body.code;
    var notes = req.body.notes;
    var tagsString = req.body.tags;

    var tagsArray = tagsString.split(',');

    const snippet = new Snippets({username: context.name, title: title, body: body, notes: notes, language: language}).save().then((newSnippet) => {
      tagsArray.forEach((tag) => {
        console.log(newSnippet);
        newSnippet.tags.push({tagName: tag});
        console.log(newSnippet.tags);
      });
        newSnippet.save();
        res.redirect('/index');
    });
  },
  addSnippetAPICreate: (req, res) => {
    var context = {
      loggedIn: true,
    };
    var title = req.body.title;
    var language = req.body.language;
    var body = req.body.code;
    var notes = req.body.notes;
    var tagsString = req.body.tags;

    var tagsArray = tagsString.split(',');

    const snippet = new Snippets({username: context.name, title: title, body: body, notes: notes, language: language}).save().then((newSnippet) => {
      tagsArray.forEach((tag) => {
        console.log(newSnippet);
        newSnippet.tags.push({tagName: tag});
        console.log(newSnippet.tags);
      });
        newSnippet.save();
        res.status(201).json({});
    });
  }
};
