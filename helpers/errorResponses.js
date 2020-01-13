const mongoose = require('mongoose');

function schemaResponse(ex) {
    
    let errMessage = []
    console.log(ex + 'asd');
    for(field in ex.errors)
        errMessage.push(ex.errors[field].message)
        
    if(errMessage == false) errMessage.push(ex.errmsg);

    return errMessage;
}

function validatorResponse(error) {
    
    let errMessage = [];
    error.details.forEach(element => {
        errMessage.push(element.message)
    });

    return errMessage;
}

function validatorObjectId(objectId) {
    
    return mongoose.Types.ObjectId.isValid(objectId);
    
}

module.exports.schemaResponse = schemaResponse;
module.exports.validatorResponse = validatorResponse;
module.exports.validatorObjectId = validatorObjectId;