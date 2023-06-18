const Movies = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const BadRequesError = require('../errors/BadRequesError');
const ForbiddenError = require('../errors/ForbiddenError');
const {
  FILM_INVALID_DATA, FILM_NOT_FOUND, FILM_FORBIDDEN_DELETE, FILM_INVALID_ID,
} = require('../utils/constants');

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
        return next(new BadRequesError(FILM_INVALID_DATA));
      }
      return next(err);
    });
};

module.exports.getMovies = (req, res, next) => {
  Movies.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch((err) => next(err));
};

module.exports.deleteMovieById = (req, res, next) => {
  Movies.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(FILM_NOT_FOUND);
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(FILM_FORBIDDEN_DELETE);
      }
      return Movies.findByIdAndRemove(req.params.movieId);
    })
    .then((deletedMovie) => res.send(deletedMovie))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequesError(FILM_INVALID_ID));
      } else {
        next(err);
      }
    });
};
