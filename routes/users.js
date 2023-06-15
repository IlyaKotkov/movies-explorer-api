const userRouter = require('express').Router();
const { getUsersById, updateUserInfo } = require('../controllers/users');
const { updateInfoUserValidation } = require('../utils/validation/updateInfoUserValidation');

userRouter.get('/me', getUsersById);
userRouter.patch('/me', updateInfoUserValidation, updateUserInfo);

module.exports = userRouter;
