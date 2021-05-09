const express = require('express');

const app = express();
const port = 3000;

const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

app.use('/users', userRouter);
app.get('/cards', cardsRouter);

app.get('/', (req, res) => res.status(404).json({ message: 'Requested resource not found' }));

app.listen(port, () => {});
