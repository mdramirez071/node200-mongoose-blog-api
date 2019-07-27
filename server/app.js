const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//const morgan = require('morgan');

mongoose.connect('mongodb://heroku_q50g5fnb:930lej3kt770uvsof401lg03tg@ds255857.mlab.com:55857/heroku_q50g5fnb', { useNewUrlParser: true });
mongoose.Promise = Promise;

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send('This page does exist!');
});

app.use('/api/users', require('./routes/users'));
app.use('/api/blogs', require('./routes/blogs'));

module.exports = app;
