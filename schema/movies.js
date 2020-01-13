const mongoose = require('mongoose');
const genreSchema = require('./genre');

module.exports = mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim : true,
        minlength : 3,
        maxlength : 255
    },
    genre : {
        type : genreSchema,
        required : true
    },
    numberInStock : {
        type : Number,
        required: true,
        default : 0,
        min : 0,
        max : 1000000
    },
    dailyRentalRate : {
        type : Number,
        default : 0,
        min : 0,
        max : 1000000
    }
});