const router = require('express').Router();

const { login, createUser } = require('../controllers/users');

const auth = require('../middlewares/auth');

const { loginValidation } = require('../utils/validation/loginValidation');
const { registerValidation } = require('../utils/validation/registerValidation');

const userRouter = require('./users');
const errorRouter = require('./router');
const moviesRouter = require('./movies');

router.post('/signin', loginValidation, login);
router.post('/signup', registerValidation, createUser);

router.use(auth);
router.use('/users', userRouter);
router.use('/movies', moviesRouter);
router.use('/*', errorRouter);

module.exports = router;
