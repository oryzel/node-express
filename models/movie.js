const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const movies = require('../schema/movies');

function validateMovie(params) {

    const schema = Joi.object({
        title : Joi.string()
            .max(250)
            .min(1)
            .required(),
        genre_id : Joi.objectId().required(),
        number_in_stock : Joi.number().min(0),
        daily_rental_rate : Joi.number().min(0)
    });

    const {error} = schema.validate(params);

    if(error) return error;

    return false;

}

module.exports.Movie = mongoose.model('movies', movies);
module.exports.validate = validateMovie;