const router = require('express').Router();
const { validateCreateMovie, validateDeleteMovie } = require('../middlewares/validator');

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
  validateCreateMovie,
  createMovie,
);

// Удаление фильма по по id
router.delete(
  '/:movieId',
  validateDeleteMovie,
  deleteMovieById,
);

module.exports = router;
