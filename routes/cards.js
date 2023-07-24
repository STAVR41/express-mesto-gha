const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regular } = require('../utils/regular');
const {
  createCard,
  getCards,
  deleteCardById,
  handleLike,
  removeLike,
} = require('../controllers/cards');

router.get('/', getCards);

router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24),
  }),
}), deleteCardById);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(regular),
  }),
}), createCard);

router.put('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24),
  }),
}), handleLike);

router.delete('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24),
  }),
}), removeLike);

module.exports = router;
