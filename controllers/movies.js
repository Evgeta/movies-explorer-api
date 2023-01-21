const ForbiddenDeleteError = require('../errors/ForbiddenDeleteError');
const IncorrectDataError = require('../errors/IncorrectDataError');
const NotFoundError = require('../errors/NotFoundError');

const Movie = require('../models/movie');

const {
  FILMS_NOT_FOUND_MESSAGE,
  INCORRECT_DATA_ERROR_MESSAGE,
  FILM_NOT_FOUND_MESSAGE,
  NOT_ALLOWED_TO_REMOVE_MESSAGE,
} = require('../errors/errors');

// Получение всех фильмов владельца
module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => {
      if (movies.length === 0) {
        return next(new NotFoundError(FILMS_NOT_FOUND_MESSAGE));
      }
      return res.send({
        movies,
      });
    })
    .catch((err) => {
      next(err);
    });
};

// Создание фильма
module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameEN,
    nameRU,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameEN,
    nameRU,
  })
    .then((movie) => res.send({
      movie,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectDataError(INCORRECT_DATA_ERROR_MESSAGE));
      }
      return next(err);
    });
};

// Удаление сохранённого фильма по по id
module.exports.deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (movie === null) {
        return next(new NotFoundError(FILM_NOT_FOUND_MESSAGE));
      }
      if (!movie.owner.equals(req.user._id)) {
        return next(new ForbiddenDeleteError(NOT_ALLOWED_TO_REMOVE_MESSAGE));
      }
      return movie.remove().then(() => res.send({
        message: 'Фильм удалён',
      }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new IncorrectDataError(INCORRECT_DATA_ERROR_MESSAGE));
      }
      return next(err);
    });
};
