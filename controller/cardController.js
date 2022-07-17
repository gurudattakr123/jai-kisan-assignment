const Customer = require('./../models/customerSchema')
const Card = require('./../models/cardSchema')

exports.getCardDetails = (req, res) => {
    try {
        Card.findOne({'cardNumber': req.params.cardId}, function (error, result) {
            if (result === null) {
                res.status(404).send({
                    code: 404,
                    status: 'failure',
                    message: 'Card information is not available for the given details.'
                });
            } else {
                res.status(200).send({code: 200, status: 'success', data: result});
            }
        })
    } catch (err) {
        res.status(500).json({code: 500, status: 'failure', message: 'Something went wrong', data: err});
    }
}

exports.getallCardsPerCustomer = async (req, res) => {
    try {
        let customerObject = await Card.find({'customerID': req.params.customerId})
        if (customerObject) {
            res.status(200).send({code: 200, status: 'success', data: customerObject});
        } else {
            res.status(404).send({
                code: 404,
                status: 'failure',
                message: 'Customer information not available for the given details.'
            });
        }
    } catch (err) {
        res.status(500).json({code: 500, status: 'failure', message: 'Something went wrong', data: err});
    }
}

exports.deleteCard = (req, res) => {
    Card.findOne({'cardNumber': req.params.cardId})
        .then(async cardObject => {
            if(cardObject) {
                await cardObject.deleteOne();
            }
            res.status(200).send({code: 200, status: 'success', message: "Card successfully deleted"});
        }).catch(err => {
        res.status(500).json({code: 500, status: 'failure', message: 'Something went wrong', data: err});
    })
}

exports.createCard = (req, res) => {
    let cardObject = new Card({
        "cardType": req.body.cardType,
        "vision": req.body.vision,
        "customerID": req.params.customerId,
        "cardNumber": req.body.cardNumber
    })
    Customer.findOneAndUpdate({customerID: req.params.customerId}, {$push: {cards: cardObject._id}})
        .then(customerObject => {
            if (customerObject) {
                cardObject.save().then(r => {
                    res.status(201).json({
                        code: 201,
                        status: 'success',
                        message: `New card for customerID - ${cardObject.customerID} created!`,
                        data: cardObject
                    });
                }).catch(err => {
                    throw err
                })
            } else {
                res.status(404).send({
                    code: 404,
                    status: 'failure',
                    message: `Customer is not available to create the card. Please create a customer first`
                })
            }
        }).catch(err => {
        res.status(500).json({code: 500, status: 'failure', message: 'Something went wrong', data: err});
    })
}