const bcrypt = require('bcryptjs');
const User = require('../models/user');

function createUser(req, res, next) {
  const {
    name,
    about,
    avatar,
    email,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
        .then((user) => res.status(201).send({
          _id: user._id,
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
        }))
        .catch(next);
    });
}
module.exports = {
  createUser,
};
