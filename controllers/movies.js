const Movies = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const BadRequesError = require('../errors/BadRequesError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
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
    nameRU,
    nameEN,
  } = req.body;
  Movies.create({
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
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequesError('Переданы некорректные данные при создании фильма.'));
      }
      return next(err);
    });
};

module.exports.getMovies = (req, res, next) => {
  Movies.find({})
    .then((movies) => res.send(movies))
    .catch((err) => next(err));
};

module.exports.deleteMovieById = (req, res, next) => {
  Movies.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('фильм с указанным _id не найден.');
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Недостаточно прав для этого действия');
      }
      return Movies.findByIdAndRemove(req.params.movieId);
    })
    .then((deletedMovie) => res.send(deletedMovie))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequesError('Передан некорректный _id.'));
      } else {
        next(err);
      }
    });
};
