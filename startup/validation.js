const Joi = require('@hapi/joi');

module.exports = function (params) {
    Joi.objectId = require('joi-objectid')(Joi)
}