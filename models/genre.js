const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const genre = require('../schema/genre');

function validateGenre(params) {

    const schema = Joi.object({
        name : Joi.string()
            .alphanum()
            .max(30)
            .min(3)
            .required()
    });

    const {error} = schema.validate(params);

    if(error) return error;

    return false;

}

exports.Genre = mongoose.model('genre', genre);
exports.validate = validateGenre;