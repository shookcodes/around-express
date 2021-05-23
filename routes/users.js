const userRouter = require('express').Router();
const { getUsers, createUser, patchUser } = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.post('/', createUser);
userRouter.patch('/', patchUser);

module.exports = userRouter;
