const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors')

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use('/users', require('./routes/users'));
//app.post('/users', cors(), require('./routes/users'));
//app.get('/cards', cardsRouter);

app.get('/', (req, res) => res.status(404).json({ message: 'Requested resource not found' }));

//app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {});
