require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const IncorrectDataError = require('../errors/IncorrectDataError');
const NotFoundError = require('../errors/NotFoundError');
const UserExistsError = require('../errors/UserExistsError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const {
  USER_NOT_FOUND_MESSAGE,
  INCORRECT_DATA_ERROR_MESSAGE,
  DUPLICATE_USER_MESSAGE,
  BAD_EMAIL_OR_PASSWORD_MESSAGE,
} = require('../errors/errors');

// const {
//   AUTHORIZATION_SUCCESSFUL_MESSAGE,
// } = require('../utils/config');

const { NODE_ENV, JWT_SECRET } = process.env;
const secret = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

// GET /users/me - возвращает информацию о пользователе (email и имя)
module.exports.getUsersMe = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(USER_NOT_FOUND_MESSAGE));
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectDataError(INCORRECT_DATA_ERROR_MESSAGE));
      }
      next(err);
    });
};

// POST /signup
// создаёт пользователя с переданными в теле email, password и name

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.send({
      name: user.name,
      email: user.email,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new UserExistsError(DUPLICATE_USER_MESSAGE));
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new IncorrectDataError(INCORRECT_DATA_ERROR_MESSAGE));
      }
      next(err);
    });
};

//  PATCH /users/me - обновление профиля пользователя

module.exports.updateUserProfile = (req, res, next) => {
  const {
    name,
    email,
  } = req.body;
  User.findByIdAndUpdate({
    _id: req.user._id,
  }, {
    name,
    email,
  }, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
  })
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(USER_NOT_FOUND_MESSAGE));
      }
      return res.send({
        data: user,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new IncorrectDataError(INCORRECT_DATA_ERROR_MESSAGE));
      }
      return next(err);
    });
};

// POST /signin аутентификация
// проверяет переданные в теле почту и пароль
// и возвращает JWT

module.exports.login = (req, res, next) => {
  const {
    email,
    password,
  } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return next(new UnauthorizedError(BAD_EMAIL_OR_PASSWORD_MESSAGE));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            // хеши не совпали — отклоняем промис
            return next(new UnauthorizedError(BAD_EMAIL_OR_PASSWORD_MESSAGE));
          }
          // аутентификация успешна
          const token = jwt.sign({
            _id: user._id,
          }, secret, { expiresIn: '7d' });
          res.send({ token });
          // res.status(200);
          // res.cookie('jwt', token, {
          //   maxAge: 3600000,
          //   httpOnly: true,
          // });
          return res.send({ message: 'Указан некорректный URL' });
        })
        .catch((err) => next(err));
    })
    .catch(next);
};
