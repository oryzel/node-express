const monggose = require('mongoose');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi)
const customerSchema = require('../schema/customers');

function validateCustomer(params) {
    const schema = Joi.object({
        name : Joi.string()
            .min(3)
            .max(30)
            .required(),
        phone: Joi.number(),
        is_gold: Joi.boolean()
    })

    const {error} = schema.validate(params);
    if(error) return error;

    return false

}

exports.Customer = monggose.model('customers', customerSchema);
exports.validate = validateCustomer;