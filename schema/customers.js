const monggose = require('mongoose');

module.exports = monggose.Schema({
        name : {
            type: String,
            required: true,
            minlength : 3,
            maxlength : 30
        },
        phone : {
            type: Number,
        },
        isGold : {
            type: Boolean
        }
    });