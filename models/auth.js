const Joi = require('@hapi/joi');

function validateAuth(params) {

    const schema = Joi.object({
        email : Joi.string().max(255).min(3).email().required(),
        password : Joi.string().max(255).min(3).required()
    });

    const {error} = schema.validate(params);

    if(error) return error;

    return false;

}

module.exports.validate = validateAuth;