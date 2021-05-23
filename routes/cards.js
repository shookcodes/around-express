const express = require('express');

const cardRouter = express.Router();
const { getCards, createCard } = require('../controllers/cards');

cardRouter.get('/', getCards);
cardRouter.post('/', createCard);

module.exports = cardRouter;
