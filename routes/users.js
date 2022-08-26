const router = require('express').Router();
const {
  updateUserProfile,
  getUsersMe,
} = require('../controllers/users');
const { validateUpdateUserProfile } = require('../middlewares/validator');

// возвращает информацию о пользователе (email и имя)
router.get('/me', getUsersMe);

// обновление профиля пользователя (email и имя)
router.patch(
  '/me',
  validateUpdateUserProfile,
  updateUserProfile,
);

module.exports = router;
