const express = require('express');
const router = express.Router();
const {Movie, validate} = require('../models/movie');
const {Genre} = require('../models/genre');
const errorResponses = require('../helpers/errorResponses');

router.get('/', async (req, res) => {
    const movie = await Movie.find();
    res.send(movie);
});

router.post('/', async (req, res) => {

    const error = await validate(req.body);
    if(error) {
        return res.send(errorResponses.validatorResponse(error));
    }

    const genre = await Genre.findById(req.body.genre_id);
    if(!genre) return res.status(404).send('Genre not found');

    const movie = new Movie({
        title : req.body.title,
        genre : {
            _id : genre._id,
            name : genre.name
        },
        numberInStock : req.body.number_in_stock,
        dailyRentalRate : req.body.daily_rental_rate
    });

    try{
        await movie.save();
        return res.send(movie);
    }
    catch(ex) {
        return res.send(errorResponses.schemaResponse(ex));
    }

});

router.put('/:id', async (req, res) => {
    const error = await validate(req.body);
    if(error) return res.send(errorResponses.validatorResponse(error));

    const genre = await Genre.findById(req.body.genre_id);

    const movie = await Movie.findByIdAndUpdate(req.params.id, {
        title : req.body.title,
        genre : {
            _id : genre._id,
            name : genre.name
        },
        numberInStock : req.body.number_in_stock,
        dailyRentalRate : req.body.daily_rental_rate
    }, {new : true});

    try{
        await movie.save;
        return res.send(movie)
    }
    catch(ex) {
        return res.send(errorResponses.schemaResponse(ex));
    }
});

router.delete('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if(!movie) return res.status(404).send('The movie not found')

    return res.send(movie);
});

router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if(!movie) res.status(404).send('The movie not found');
    
    res.send(movie);
});

module.exports = router;