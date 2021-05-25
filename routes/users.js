const userRouter = require('express').Router();
const {
  getUsers, createUser, patchUserProfile, patchUserAvatar,
} = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.post('/', createUser);
userRouter.patch('/me', patchUserProfile);
userRouter.patch('/me/avatar', patchUserAvatar);

module.exports = userRouter;
