const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    maxlength: 30,
    minlength: 2,
    required: true,
    type: String,
  },
  link: {
    required: true,
    type: String,
  },
  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  likes: [
    {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });
module.exports = mongoose.model('card', cardSchema);
