const mongoose = require('mongoose');

const snippetsSchema = new mongoose.Schema({
  username: {type: String, required: true},
  title: {type: String, unique: true, required: true},
  body: {type: String, required: true},
  notes: String,
  language: {type: String, required: true},
  tags: [{
    tagName: {type: String, required: true}
  }]
});

const Snippets = mongoose.model('Snippets', snippetsSchema);

module.exports = Snippets;
