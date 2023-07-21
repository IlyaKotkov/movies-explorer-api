const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequesError = require('../errors/BadRequesError');
const ConflictError = require('../errors/ConflictError');
const {
  USER_NOT_FOUND, USER_INVALID_DATA, USER_CONFLICT_EMAIL, USER_INVALID_ID,
} = require('../utils/constants');

const updateUser = (req, res, data, next) => {
  User.findByIdAndUpdate(req.user._id, data, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(
          USER_NOT_FOUND,
        );
      }

      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequesError(USER_INVALID_DATA));
      } else if (err.code === 11000) {
        next(new ConflictError(USER_CONFLICT_EMAIL));
      } else {
        next(err);
      }
    });
};

module.exports.getUsersById = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(USER_NOT_FOUND);
      }

      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequesError(USER_INVALID_ID));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash, // записываем хеш в базу
    }))
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(USER_CONFLICT_EMAIL));
      } else if (err.name === 'ValidationError') {
        next(new BadRequesError(USER_INVALID_DATA));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'secret');

      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  updateUser(req, res, { name, email }, next);
};
