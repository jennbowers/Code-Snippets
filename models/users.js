const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  username: {type: String, unique: true, required: true},
  password: {
    salt: String,
    iterations: Number,
    hash: String
  }
});

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;
