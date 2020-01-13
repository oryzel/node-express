const error = require('../middlewares/error');
const express = require('express');

// require all application route
const auth = require('../routes/auth');
const users = require('../routes/users');
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');

module.exports = function(app) {
    
    app.use(express.json());
    app.get('/', (req, res) => {
        res.send('This is api');
    });
    app.use('/api/login', auth);
    app.use('/api/users', users);
    app.use('/api/genres', genres);
    app.use('/api/customers', customers);
    app.use('/api/movies', movies);
    app.use('/api/rentals', rentals);

    app.use(error);
}