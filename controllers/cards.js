const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({}).orFail(new Error('Error'))
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      if (err.message === 'Error') {
        res.status(404).send({ message: 'Requested resource not found' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Valid data not provided' });
      } else {
        res.status(500).send({ message: 'Error' });
      }
    });
};

module.exports.createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link, createdAt } = req.body;

  Card.create(
    {
      name, link, owner, createdAt,
    },
  )
    .then((card) => res.send({ data: card }))
    .catch(() => {
      res.status(404).send({ message: 'Valid data not provided' });
    });
};

module.exports.deleteCard = (req, res) => {
  if (Card.owner === req.params.owner) {
    Card.findByIdAndRemove(req.params.cardId).orFail(new Error('Not Found'))
      .then((user) => res.send({ data: user }))
      .catch((err) => {
        if (err.message === 'Not Found') {
          res.status(404).send({ message: 'Requested resource not found' });
        } else if (err.name === 'CastError') {
          res.status(400).send({ message: 'Valid data not provided' });
        } else {
          res.status(500).send({ message: 'Error' });
        }
      });
  }
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail(new Error('Not found'))
    .then((like) => res.send({ data: like }))
    .catch((err) => {
      if (err.message === 'Not Found') {
        res.status(404).send({ message: 'Requested resource not found' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Valid data not provided' });
      } else {
        res.status(500).send({ message: 'Error' });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).orFail(new Error('Not found'))
    .then((like) => res.send({ data: like }))
    .catch((err) => {
      if (err.message === 'Not Found') {
        res.status(404).send({ message: 'Requested resource not found' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Valid data not provided' });
      } else {
        res.status(500).send({ message: 'Error' });
      }
    });
};
