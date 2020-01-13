const mongoose = require('mongoose');

module.exports = mongoose.Schema({
    customer : {
        type : new mongoose.Schema({
            _id : {
                type : String,
                required : true
            },
            name : {
                type : String,
                required : true
            },
            isGold : {
                type : Boolean,
                required : true
            }
        })
    },
    movie : {
        type : new mongoose.Schema({
            _id : {
                type : String,
                required : true
            },
            title : {
                type : String,
                required : true
            },
            dailyRentalRate : {
                type : Number,
                required : true
            }
        })
    },
    dateOut : {
        type : Date,
        default : Date.now()
    },
    dateReturn : {
        type : Date
    },
    totalPrice : {
        type : Number
    }
});