const winston = require('winston');
// require('winston-mongodb');

module.exports = function (params) {
    
    winston.add(new winston.transports.Console({colorize : true, prettyPrint : true}));
    winston.add(new winston.transports.File({filename : 'logs/logfile.log'}));
    winston.add(new winston.transports.MongoDB({db : 'mongodb://localhost:27017/errorLog'}));
    winston.handleExceptions(new winston.transports.File({
        filename: './logs/exceptions.log'
    }));
    
    //Log for unhandled rejection
    process.on('unhandledRejection', (ex) => {
        throw ex;
    });
}