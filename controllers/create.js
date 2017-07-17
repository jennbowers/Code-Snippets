// models
const Snippets = require('../models/snippets');
const Users = require('../models/users');

module.exports= {
  renderCreate: (req, res) => {
    res.render('create', {});
  },
  addSnippetCreate: (req, res) => {
    
  }
};
