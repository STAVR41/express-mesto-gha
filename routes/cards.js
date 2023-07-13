const router = require('express').Router();
const {
  createCard,
  getCards,
  deleteCardById,
  handleLike,
  removeLike,
} = require('../controllers/cards');

router.get('/', getCards);
router.delete('/:id', deleteCardById);
router.post('/', createCard);
router.put('/:id/likes', handleLike);
router.delete('/:id/likes', removeLike);

module.exports = router;
