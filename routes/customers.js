const express = require('express');
const router = express.Router();
const {Customer, validate} = require('../models/customer');
const errorResponses = require('../helpers/errorResponses');

router.get('/', async (req, res) => {

    const customer = await Customer.find();
    res.send(customer);

});

router.post('/', async (req, res) => {

    const validator = await validate(req.body);
    if(validator) res.status(404).send(errorResponses.validatorResponse(validator));

    const customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.is_gold,
    })

    try{
        await customer.save();
        res.send(customer);
    }
    catch(ex) {
        const errMessage = errorResponses.schemaResponse(ex);
        res.send(errMessage);
    }

});

router.put('/:id', async (req, res) => {
    const vallidate = validate(req.body);
    if(validator) res.status(404).send(errorResponses.validatorResponse(validator));

    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.is_gold,
    }, {new: true});
    if(!customer) res.status(404).send('Customer not found');

    try{
        res.send(customer);
    }
    catch(ex){
        const errMessage = errorResponses.schemaResponse(ex);
        res.send(errMessage);
    }

});

router.delete('/:id', async (req, res) => {

    const customer = await Customer.findByIdAndRemove(req.params.id);
    if(!customer) res.status(404).send('Customer not found');

    try{
        res.send(customer);
    }
    catch(ex){
        const errMessage = errorResponses.schemaResponse(ex);
        res.send(errMessage);
    }

});

router.get('/:id', async (req, res) => {

    const isValid = await errorResponses.validatorObjectId(req.params.id);
    if(isValid === false) return res.status(400).send('Invalid Object Id');

    const customer = await Customer.findById(req.params.id);
    if(!customer) res.status(404).send('Customer not found');

    try{
        res.send(customer);
    }
    catch(ex){
        const errMessage = errorResponses.schemaResponse(ex);
        res.send(errMessage);
    }

});

module.exports = router;