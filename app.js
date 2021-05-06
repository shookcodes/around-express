const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

const userRouter = require('./routes/users');

app.use('/users', userRouter);

//app.get('/', (req, res) => res.json({ message: 'Requested resource not found' }));

app.use('/', express.static('../client/public'));

app.get('/cards', (req, res) => {
  fs.readFile(path.join(__dirname, './data/cards.json'), 'utf-8', (err, data) => {
    if (err) throw err;
    res.send(JSON.parse(data));
  });

  console.log(req.params);
});

app.listen(port, () => {
  console.log('Listening working!');
});
