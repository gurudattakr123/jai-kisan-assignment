const Customer  = require('./../models/customerSchema')
const Card  = require('./../models/cardSchema')
var mongoose = require('mongoose');
const uuid = require('uuid')

exports.getCardDetails = (req, res) => {
    try{
        Card.findOne({ 'customerID': req.params.customerId }, function (error, result) {
            if (result === null) {
                res.status(404).send({ code: 404, status: 'failure', message: 'Customer information not available for the given details.' });
            } else {
                res.status(200).send({ code: 200, status: 'success', data: result });
            }
        })
    }catch(err){
        res.status(500).json({ code: 500, status: 'failure', message: 'Something went wrong', data: err });
    }
}

exports.getallCardsPerCustomer = async (req, res) => {
    try{
        let customerObject = await Card.find({ 'customerID': req.params.customerId })
        if (customerObject) {
            res.status(200).send({ code: 200, status: 'success', data: customerObject });
        } else {
            res.status(404).send({ code: 404, status: 'failure', message: 'Customer information not available for the given details.' });
        }
    }catch(err){
        res.status(500).json({ code: 500, status: 'failure', message: 'Something went wrong', data: err });
    }
}

exports.deleteCard = (req, res) => {
    try{
        Card.findOneAndDelete({ 'cardNumber': req.params.cardId }, function (error, result) {
            if (result === null) {
                res.status(404).send({ code: 404, status: 'failure', message: 'Customer information not available for the given details.' });
            } else {
                res.status(200).send({ code: 200, status: 'success', data: result });
            }
        })
    }catch(err){
        res.status(500).json({ code: 500, status: 'failure', message: 'Something went wrong', data: err });
    }
}

exports.createCard = (req, res) => {
    try{
        var id = uuid.v1();
        let cardObject = new Card({
            "cardType": req.body.cardType,
            "vision": req.body.vision,
            "customerID": req.params.customerId,
            "cardNumber": id
        })
        Customer.findOneAndUpdate({ customerID: req.params.customerId }, {$push: {cards:cardObject._id}})
        .then(customerObject =>{
            if(customerObject){
                cardObject.save();
                res.status(201).json({ code: 201, status: 'success', message: `New card for customerID - ${cardObject.customerID} created!`, data: cardObject });
            } else {
                res.status(404).send({ code: 404, status: 'failure', message: `Customer is not avalable to create the card. Please create a customer first`})
            }
        }).catch(err => {
            res.send(err)
        })
    }
    catch(err){ 
        res.status(500).json({ code: 500, status: 'failure', message: 'Something went wrong', data: err });
    }

    
}