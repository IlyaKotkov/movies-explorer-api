const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const {
  getMovies, createMovie, deleteMovieById,
} = require('../controllers/movies');
const { regexLink } = require('../utils/constants');

router.get('/movies', auth, getMovies);
router.post('/movies', auth, celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(regexLink),
    trailerLink: Joi.string().required().regex(regexLink),
    thumbnail: Joi.string().required().regex(regexLink),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);
router.delete('/movies/:movieId', auth, celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24).required(),
  }),
}), deleteMovieById);

module.exports = router;
