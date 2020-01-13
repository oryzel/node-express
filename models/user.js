const monggose = require('mongoose');
const Joi = require('@hapi/joi');
const user = require('../schema/users');

function validateUser(params) {

    const schema = Joi.object({
        email : Joi.string().max(255).min(3).email().required(),
        name : Joi.string().max(255).min(3).required(),
        password : Joi.string().max(255).min(3).required()
    });

    const {error} = schema.validate(params);

    if(error) return error;

    return false;

}

const userSchema = new monggose.model('users', user);

module.exports.validate = validateUser;
module.exports.User = userSchema;