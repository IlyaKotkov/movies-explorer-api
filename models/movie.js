const mongoose = require('mongoose');
const { regexLink } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (image) => regexLink.test(image),
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (image) => regexLink.test(image),
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (thumbnailImage) => regexLink.test(thumbnailImage),
    },
  },
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
