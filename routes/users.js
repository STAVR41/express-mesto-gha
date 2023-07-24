const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regular } = require('../utils/regular');

const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUser);

router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24),
  }),
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(regular),
  }),
}), updateAvatar);

module.exports = router;
