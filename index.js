const express = require('express');
const app = express();
const winston = require('winston');

//Load env
require('dotenv').config();

//Set logging Configuration
require('./startup/logging')();

//Set Custom Configuration
require('./startup/config')();

//Set database Configuration
require('./startup/database')();

//Import all routes application
require('./startup/routes')(app);

//Set Validation Configuration
require('./startup/validation')();

const server = app.listen(5000, () => winston.info('Listening on port 5000'));

module.exports = server;