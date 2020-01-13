const mongoose =  require('mongoose');

module.exports = mongoose.Schema({
    name : {
        type: String,
        required: true
    }
});