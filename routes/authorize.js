const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const { loginValidation } = require('../utils/validation/loginValidation');
const { registerValidation } = require('../utils/validation/registerValidation');

router.post('/signin', loginValidation, login);
router.post('/signup', registerValidation, createUser);

module.exports = router;
