const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    if(!req.header('x-jwt')) return res.status(401).send('Access denied toke not provided');

    try{

        const decoded = jwt.verify(req.header('x-jwt'), process.env.JWT_PRIVATE_KEY);
        req.user = decoded;
        next();
    
    }
    catch(ex) {
        return res.status(400).send('Invalid token');
    }

}