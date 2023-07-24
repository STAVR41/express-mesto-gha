const mongoose = require('mongoose');

module.exports = (err, req, res, next) => {
  if (err instanceof mongoose.Error.DocumentNotFoundError) {
    return res.status(404).send({ message: 'Пользователь не найден' });
  }
  if (err instanceof mongoose.Error.ValidationError || err instanceof mongoose.Error.CastError) {
    return res.status(400).send({ message: 'Некорректные данные' });
  }
  if (err.code === 11000) {
    return res.status(409).send({ message: 'Такой email уже используется' });
  }
  if (err.message === 'Вы можете удалять только свои карточки') {
    return res.status(403).send({ message: 'Вы можете удалять только свои карточки' });
  }
  if (err.message === 'Необходима авторизация') {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  if (err.message === 'Неправильная почта или пароль') {
    return res.status(401).send({ message: 'Неправильная почта или пароль' });
  }
  return next(res.status(500).send({ message: 'На сервере произошла ошибка' }));
};
