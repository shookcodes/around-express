const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({}).orFail()
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(404).send({ message: 'Requested resource not found' }));
};

module.exports.getUser = (req, res) => {
  User.find({}).orFail(new Error('User not found'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.message === 'User not Found') {
        res.status(404).send({ message: 'Requested resource not found' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Valid data not provided' });
      } else {
        res.status(500).send({ message: 'Error' });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => {
      res.status(404).send({ message: 'Invalid request' });
    });
};

module.exports.patchUserProfile = (req, res) => {
  const { name, about } = req.body;
  if (User._id === req.params._id) {
    User.findByIdAndUpdate(req.user._id, { name, about }, {
      new: true,
      runValidators: true,
      upsert: false,
    })
      .then((user) => res.send({ data: user }))
      .catch(() => {
        res.status(404).send({ message: 'Requested resource not found' });
      });
  }
};

module.exports.patchUserAvatar = (req, res) => {
  const { avatar } = req.body;
  if (User._id === req.params._id) {
    User.findByIdAndUpdate(req.user._id, { avatar }, {
      new: true,
      runValidators: true,
      upsert: false,
    })
      .then((user) => res.send({ data: user }))
      .catch(() => {
        res.status(404).send({ message: 'Requested resource not found' });
      });
  }
};
