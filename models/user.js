const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    maxlength: 30,
    minlength: 2,
    required: true,
    type: String,
  },
  about: {
    maxlength: 30,
    minlength: 2,
    required: true,
    type: String,
  },
  avatar: {
    required: true,
    type: String,
  },
});
module.exports = mongoose.model('user', userSchema);
