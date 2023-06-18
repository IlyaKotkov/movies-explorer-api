const moviesRouter = require('express').Router();
const {
  getMovies, createMovie, deleteMovieById,
} = require('../controllers/movies');
const { createMovieValidation } = require('../utils/validation/createMovieValidation');
const { deleteMovieValidation } = require('../utils/validation/deleteMovieValidation');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', createMovieValidation, createMovie);
moviesRouter.delete('/:movieId', deleteMovieValidation, deleteMovieById);

module.exports = moviesRouter;
