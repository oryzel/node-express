const _ = require('lodash');
const bcrypt = require('bcrypt')
const express = require('express');
const router = express.Router();
const errorResponse = require('../helpers/errorResponses');
const {User} = require('../models/user');
const {validate} = require('../models/auth');

router.post('/', async (req, res) => {

    const error = await validate(req.body);
    if(error) return res.send(errorResponse.validatorResponse(error));

    const user = await User.findOne({email : req.body.email});
    if(!user) return res.status(400).send('Invalid credential');
    
    const isValidUser = await bcrypt.compare(req.body.password, user.password);
    if(!isValidUser) return res.status(400).send('Invalid credential');

    const token = user.generateAuthToken();
    return res.send(token);

});

module.exports = router;