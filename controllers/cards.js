const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({}).orFail()
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(400).send({ message: 'Requested resource not found' }));
};

module.exports.createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link, createdAt } = req.body;

  Card.create(
    {
      name, link, owner, createdAt,
    },
  ).orFail()
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(400).send({ message: 'Error' }));
};

module.exports.deleteCard = (req, res) => {
  if (Card.owner === req.params.owner) {
    Card.findByIdAndRemove(req.params.cardId).orFail()
      .then((user) => res.send({ data: user }))
      .catch(() => res.status(500).send({ message: 'Error' }));
  }
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail()
    .then((like) => res.send({ data: like }))
    .catch(() => res.status(500).send({ message: 'Error' }));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).orFail()
    .then((like) => res.send({ data: like }))
    .catch(() => res.status(500).send({ message: 'Resource not found' }));
};
