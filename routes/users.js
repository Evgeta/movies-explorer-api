const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
// getUsers,
//  getUserById,
  updateUserProfile,
  // updateAvatar,
  getUsersMe,
} = require('../controllers/users');
// const { linkRegEx } = require('../utils/regulars');

// // Получение всех всех пользователей
// router.get('/', getUsers);

// возвращает информацию о пользователе (email и имя)
router.get('/me', getUsersMe);

// Получение пользователя по _id
// router.get('/:userId', celebrate({
//   params: Joi.object().keys({
//     userId: Joi.string().required().hex().length(24),
//   }),
// }), getUserById);

// обновление профиля пользователя (email и имя)
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateUserProfile);

// обновление аватара
// router.patch('/me/avatar', celebrate({
//   body: Joi.object().keys({
//     avatar: Joi.string().required().pattern(linkRegEx),
//   }),
// }), updateAvatar);

module.exports = router;
