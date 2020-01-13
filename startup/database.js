const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function (params) {
    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => winston.info('Connected to mongodb'))
    mongoose.set('useCreateIndex', true);
};