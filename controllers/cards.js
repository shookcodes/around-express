const Card = require('../models/cards');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Requested resource not found' }));
};

module.exports.createCard = (req, res) => {
  const { name, link, owner, createdAt } = req.body;

  Card.create({ name, link, owner, createdAt })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Error' }));
};

module.exports.deleteCard = (req, res) => {
  const { _id } = req.body;

  Card.delete({ _id });
  Card.findByIdAndRemove(req.params.id)
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Error' }));
};
