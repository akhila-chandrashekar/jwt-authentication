require('dotenv').config(); // Sets up dotenv as soon as our application starts

const express = require('express'); 
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongooose = require('mongoose');
const app = express();

const environment = process.env.NODE_ENV || 'development'; // development
const config = require('./config/local_config')[environment];

const router = express.Router();
const routes = require("./routes/index_route");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

if (environment !== 'production') {
  app.use(logger('dev'));
}

mongooose.connect(config.db.url + "/" + config.db.databaseName, {useNewUrlParser: true, poolSize: 20}, (err) => {
  if (err) {
    console.log('Connection error. Mongo Service may be down.');
    process.exit();
  } else {
    console.log('Mongo DB connection successful on '+ config.db.url + "/" + config.db.databaseName);
  }
});
app.use('/api/v1', routes(router));

app.listen(`${config.port}`, () => {
  console.log(`Server now listening at localhost:${config.port}`);
});

module.exports = app;   