const express = require('express');
const router = express.Router();
const {Rental, validate} = require('../models/rental');
const {Movie} = require('../models/movie');
const {Customer} = require('../models/customer');
const errorResponse = require('../helpers/errorResponses');
const mongoose = require('mongoose');
const Fawn = require('fawn');
Fawn.init(mongoose);

router.get('/', async (req, res) => {
    const rental = await Rental.find();

    return res.send(rental);
});

router.post('/', async(req, res) => {
    const error = validate(req.body);
    if(error) return res.send(errorResponse.validatorResponse(error));

    let customer = await Customer.findById(req.body.customer_id);
    if(!customer) return res.status(404).send('Customer not found');
    let movie = await Movie.findById(req.body.movie_id);
    if(!movie) return res.status(404).send('Movie not found');
    
    const rental = new Rental({
        customer : {
            _id : customer._id,
            name : customer.name,
            isGold : customer.isGold
        },
        movie : {
            _id : movie._id,
            title : movie.title,
            dailyRentalRate : movie.dailyRentalRate
        }
    });

    try{
        new Fawn.Task()
            .save('rentals', rental)
            .update('movies', {_id : movie._id}, {$inc : {numberInStock : -1} })
            .run();

        return res.send(rental);
    }
    catch(ex){
        return res.send(errorResponse.schemaResponse(ex));
    }

});

module.exports = router;