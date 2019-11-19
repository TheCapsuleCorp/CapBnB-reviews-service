const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

// const db = require('../database');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/../client/dist`));

app.get('/*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
