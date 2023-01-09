const router = require('express').Router();
const { errors } = require('celebrate');
const auth = require('../middlewares/auth');
const { validateCreateUser, validateLogin } = require('../middlewares/validator');

const NotFoundError = require('../errors/NotFoundError');
const { login, createUser } = require('../controllers/users');

const { PAGE_NOT_FOUND } = require('../errors/errors');

router.post(
  '/signin',
  validateLogin,
  login,
);

router.post(
  '/signup',
  validateCreateUser,
  createUser,
);

router.use(auth);
router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use(() => { throw new NotFoundError(PAGE_NOT_FOUND); });

router.use(errors());

module.exports = router;
