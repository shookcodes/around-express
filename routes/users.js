const userRouter = require('express').Router();
const { getUsers, createUser } = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.post('/', createUser);

module.exports = userRouter;
