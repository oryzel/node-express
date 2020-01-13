const jwt = require('jsonwebtoken');
const monggose = require('mongoose');

const userSchema = monggose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    }
});

userSchema.methods.generateAuthToken = function() {
    const token =  jwt.sign({_id : this.id, email : this.email}, (process.env.JWT_PRIVATE_KEY));
    return token;
};

module.exports = userSchema