const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({}).orFail()
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(404).send({ message: 'Requested resource not found' }));
};

module.exports.getUser = (req, res) => {
  User.find({}).orFail()
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(404).send({ message: 'Requested resource not found' }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar }).orFail()
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(400).send({ message: 'You did not enter a valid URL' }));
};

module.exports.patchUserProfile = (req, res) => {
  const { name, about } = req.body;
  if (User._id === req.params._id) {
    User.findByIdAndUpdate(req.user._id, { name, about }, {
      new: true,
      runValidators: true,
      upsert: false,
    }).orFail()
      .then((user) => res.send({ data: user }))
      .catch(() => res.status(400).send({ message: 'Data validation failed or another error occured.' }));
  }
};

module.exports.patchUserAvatar = (req, res) => {
  const { avatar } = req.body;
  if (User._id === req.params._id) {
    User.findByIdAndUpdate(req.user._id, { avatar }, {
      new: true,
      runValidators: true,
      upsert: false,
    }).orFail()
      .then((user) => res.send({ data: user }))
      .catch(() => res.status(400).send({ message: 'Data validation failed or another error occured.' }));
  }
};
