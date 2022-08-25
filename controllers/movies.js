const ForbiddenDeleteError = require('../errors/ForbiddenDeleteError');
const IncorrectDataError = require('../errors/IncorrectDataError');
const NotFoundError = require('../errors/NotFoundError');

const Movie = require('../models/movie');

// Получение всех фильмов
module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => {
      if (!movies) {
        return next(new NotFoundError('Не удалось найти фильмы'));
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
        next(new IncorrectDataError('В запросе переданы некорректные данные'));
      }
      return next(err);
    });
};

// Удаление сохранённого фильма по по id
module.exports.deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError('Карточка с таким id не найдена'));
      }
      if (!movie.owner.equals(req.user._id)) {
        return next(new ForbiddenDeleteError('Нельзя удалить фильм, отмеченный другим пользователем'));
      }
      return movie.remove().then(() => res.send({
        message: 'Фильм удалён',
      }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new IncorrectDataError('В запросе переданы некорректные данные'));
      }
      return next(err);
    });
};
