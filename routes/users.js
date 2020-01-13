const _ = require('lodash');
const bcrypt = require('bcrypt')
const express = require('express');
const router = express.Router();
const errorResponse = require('../helpers/errorResponses');
const {User, validate} = require('../models/user');

//require middleware
const authMiddleware = require('../middlewares/auth');

router.get('/me', authMiddleware, async(req, res) => {
    const user = await User.findById(req.user._id);

    res.send(user);
});

router.post('/', async (req, res) => {

    const error = await validate(req.body);
    if(error) return res.send(errorResponse.validatorResponse(error));

    const user = new User(_.pick(req.body, ['email', 'name', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    try{
        await user.save();
        const token = user.generateAuthToken();
        return res.header('x-jwt', token).send(_.pick(user, ['email', 'name']));
    }
    catch(ex) {
        return res.send(errorResponse.schemaResponse(ex));
    }

});

module.exports = router;