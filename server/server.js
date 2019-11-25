const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const db = require('../database');
db.connect();
const apiRouter = require('./apiRouter');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/../client/dist`));

app.use('/api', apiRouter);

app.get('/rooms/:roomId', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
});

module.exports = app;
