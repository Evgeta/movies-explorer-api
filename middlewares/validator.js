const { celebrate, Joi } = require('celebrate');
const isURL = require('validator/lib/isURL');
const { BAD_URL_FORMAT_MESSAGE } = require('../errors/errors');

const validateUrl = (value, helpers) => {
  if (isURL(value)) {
    return value;
  }
  return helpers.message(BAD_URL_FORMAT_MESSAGE);
};

// проверка для POST /signup
const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

// проверка для POST /signin
const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

// проверка для PATCH /users/me
const validateUpdateUserProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

// проверка POST /movies
const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(validateUrl),
    trailerLink: Joi.string().required().custom(validateUrl),
    thumbnail: Joi.string().required().custom(validateUrl),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

// проверка DELETE /movies/:movieId
const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  validateUrl,
  validateLogin,
  validateCreateUser,
  validateUpdateUserProfile,
  validateCreateMovie,
  validateDeleteMovie,
};
