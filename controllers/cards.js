const Card = require('../models/card');

function getCards(req, res) {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
}
function createCard(req, res) {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(400).send({ message: 'Переданы некорректные данные при создании карточки.' });
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
}
function deleteCardById(req, res) {
  Card.findByIdAndRemove(req.params.id)
    .orFail()
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') return res.status(404).send({ message: 'Карточка с указанным _id не найдена.' });
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
}
function handleLike(req, res) {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((like) => res.send(like))
    .catch((err) => {
      if (err.name === 'CastError') return res.status(400).send({ message: 'Переданы некорректные данные для постановки/снятии лайка.' });
      if (err.name === 'DocumentNotFoundError') return res.status(404).send({ message: 'Передан несуществующий _id карточки.' });
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
}
function removeLike(req, res) {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((like) => res.send(like))
    .catch((err) => {
      if (err.name === 'CastError') return res.status(400).send({ message: 'Переданы некорректные данные для постановки/снятии лайка.' });
      if (err.name === 'DocumentNotFoundError') return res.status(404).send({ message: 'Передан несуществующий _id карточки.' });
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
}

module.exports = {
  createCard,
  getCards,
  deleteCardById,
  handleLike,
  removeLike,
};
