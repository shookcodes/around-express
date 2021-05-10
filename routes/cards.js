const express = require('express');

const path = require('path');
const fs = require('fs');

const cardsRouter = express.Router();

cardsRouter.get('/cards', (req, res) => {
  fs.readFile(path.join(__dirname, '../data/cards.json'), 'utf-8', (err, data) => {
    if (err) {
      return res.status(404).json({ message: 'Requested resource not found' });
    }
    return res.send(JSON.parse(data));
  });
});

module.exports = cardsRouter;
