const Card = require('../models/card');

function getCards(req, res, next) {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
}
function createCard(req, res, next) {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch(next);
}
function deleteCardById(req, res, next) {
  const { _id } = req.user;
  Card.findById(req.params.id)
    .orFail()
    .then((card) => {
      if (_id !== JSON.stringify(card.owner).slice(1, -1)) throw new Error('Вы можете удалять только свои карточки');
      Card.findByIdAndRemove(req.params.id)
        .then(() => res.status(200).send({ data: card }))
        .catch(next);
    })
    .catch(next);
}
function handleLike(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((like) => res.send(like))
    .catch(next);
}
function removeLike(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((like) => res.send(like))
    .catch(next);
}

module.exports = {
  createCard,
  getCards,
  deleteCardById,
  handleLike,
  removeLike,
};
