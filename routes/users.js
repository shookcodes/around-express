const express = require('express');

const path = require('path');
const fs = require('fs');

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
  fs.readFile(path.join(__dirname, '../data/users.json'), 'utf-8', (err, data) => {
    if (err) {
      return res.json({ message: 'Requested resource not found' });
    }
    return res.send(JSON.parse(data));
  });
});

userRouter.get('/:id', (req, res) => {
  fs.readFile(path.join(__dirname, '../data/users.json'), 'utf-8', (err, data) => {
    if (err) {
      return res.json({ message: 'Path not found' });
    }
    const userData = JSON.parse(data);

    const foundUser = userData.find((user) => user._id === req.params.id);
    if (!foundUser) {
      return res.json({ message: 'Requested resource not found' });
    }
    return res.json(foundUser);
  });
});

module.exports = userRouter;