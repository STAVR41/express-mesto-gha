const User = require('../models/user');

function getUsers(req, res) {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
}
function createUser(req, res) {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
}
function getUserById(req, res) {
  User.findById(req.params.id)
    .orFail()
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') return res.status(404).send({ message: 'Пользователь по указанному _id не найден.' });
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
}
function updateProfile(req, res) {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      if (err.name === 'DocumentNotFoundError') return res.status(404).send({ message: 'Пользователь с указанным _id не найден.' });
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
}
function updateAvatar(req, res) {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(400).send({ message: 'Переданы некорректные данные при обновлении аватара.' });
      if (err.name === 'DocumentNotFoundError') return res.status(404).send({ message: 'Пользователь с указанным _id не найден.' });
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
};
