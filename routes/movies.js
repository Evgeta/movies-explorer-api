const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const { linkRegEx } = require('../utils/regulars');

const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');

// Получение всех всех фильмов
router.get('/', getMovies);

// Создание фильма
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().pattern(linkRegEx),
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().pattern(linkRegEx),
      trailerLink: Joi.string().required().pattern(linkRegEx),
      thumbnail: Joi.string().required().pattern(linkRegEx),
      movieId: Joi.number().required(),
      nameEN: Joi.string().required(),
      nameRU: Joi.string().required(),
    }).messages({ 'string.pattern': 'Некорректный URL' }),
  }),
  createMovie,
);

// Удаление фильма по по id
router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
}), deleteMovieById);

module.exports = router;
