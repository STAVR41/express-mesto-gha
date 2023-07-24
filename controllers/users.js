const User = require('../models/user');

function getUsers(req, res, next) {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
}
function getUserById(req, res, next) {
  User.findById(req.params.id)
    .orFail()
    .then((user) => res.status(200).send({ data: user }))
    .catch(next);
}
function getCurrentUser(req, res, next) {
  const { _id } = req.user;
  User.findOne({ _id })
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch(next);
}
function updateProfile(req, res, next) {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.status(200).send({ data: user }))
    .catch(next);
}
function updateAvatar(req, res, next) {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.status(200).send({ data: user }))
    .catch(next);
}

module.exports = {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getCurrentUser,
};
