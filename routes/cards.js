const express = require('express');

const path = require('path');
const fs = require('fs');

const userRouter = express.Router();

app.use('/', express.static('./public'));


userRouter.get('/', (req, res) => {
  fs.readFile(path.join(__dirname, '../data/cards.json'), 'utf-8', (err, data) => {
    if (err) {
      return res.json({ message: 'Requested resource not found' });
    }
    return res.send(JSON.parse(data));
  });
});
