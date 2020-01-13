const express = require('express');
const router = express.Router();
const {Genre, validate} = require('../models/genre');
const errorResponses = require('../helpers/errorResponses');

//require middleware
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

router.get('/',  async (req, res) => {

    try{
        const genre = await Genre.find();
        res.send(genre);
    }
    catch(ex) {
        res.status(500).send('Something failed');
    }
    
});

router.post('/', async (req, res) => {

    const validator = await validate(req.body);
    if(validator) res.status(404).send(errorResponses.validatorResponse(validator));

    const genre = new Genre({
        name : req.body.name
    });

    try{
        await genre.save();
        res.send(genre);
    }
    catch(ex) {
        let errMessage = [];
        for(field in ex.errors)
            errMessage.push(ex.errors['field'].message);

        res.send(errMessage);
    }

});

router.put('/:id', async (req, res) => {

    const validator = await validate(req.body);
    if(validator) res.status(404).send(errorResponses.validatorResponse(validator));

    const genre = await Genre.findByIdAndUpdate(req.params.id, {name :  req.body.name}, {new:true});
    if(!genre) res.status(404).send('The genre not found');
    
    res.send(genre);

});

router.delete('/:id', async (req, res) => {

    const genre = await Genre.findByIdAndRemove({_id : req.params.id});
    if(!genre) res.status(404).send('The genre not found');
    
    res.send(genre);

});

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    res.send(genre);
});

module.exports = router;