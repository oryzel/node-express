const rental = require('../schema/rentals')
const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

function validateRental(params) {

    const schema = Joi.object({
        customer_id : Joi.objectId().required(),
        movie_id : Joi.objectId().required()
    });

    const {error} = schema.validate(params);

    if(error) return error;

    return false;
}

module.exports.validate = validateRental;
module.exports.Rental = mongoose.model('rentals', rental);