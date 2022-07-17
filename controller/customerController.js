const Customer = require('../models/customerSchema')
const uuid = require('uuid')

exports.getCustomerDetails = async (req, res) => {
    let status = req.query.status || 'ACTIVE'
    Customer.findOne({'customerID': req.params.customerId, 'status': status}).populate('cards')
        .then(customerObject => {
            if (customerObject) {
                res.status(200).send({code: 200, status: 'success', data: customerObject});
            } else {
                res.status(404).send({
                    code: 404,
                    status: 'failure',
                    message: 'Customer information not available for the given details.'
                });
            }
        }).catch(err => {
        if (err.name === 'ValidationError') {
            res.status(400).json({code: 400, status: 'failure', message: err.message, data: err});
        } else {
            res.status(500).json({code: 500, status: 'failure', message: 'Something went wrong', data: err});
        }
    })
}

exports.getallCustomers = async (req, res) => {
    let status = req.query.status || 'ACTIVE'
    Customer.find({status: status}).populate('cards')
        .then(customerObject => {
            if (customerObject) {
                res.status(200).send({code: 200, status: 'success', data: customerObject});
            } else {
                res.status(404).send({
                    code: 404,
                    status: 'failure',
                    message: 'Customer information not available for the given details.'
                });
            }
        }).catch(err => {
        if (err.name === 'ValidationError') {
            res.status(400).json({code: 400, status: 'failure', message: err.message, data: err});
        } else {
            res.status(500).json({code: 500, status: 'failure', message: 'Something went wrong', data: err});
        }
    })
}

exports.deleteCustomer = (req, res) => {
    Customer.findOneAndDelete({'customerID': req.params.customerId})
        .then(customerObject => {
            res.status(200).send({code: 200, status: 'success', message: "Customer successfully deleted"});
        }).catch(err => {
        if (err.name === 'ValidationError') {
            res.status(400).json({code: 400, status: 'failure', message: err.message, data: err});
        } else {
            res.status(500).json({code: 500, status: 'failure', message: 'Something went wrong', data: err});
        }
    })
}

exports.createCustomer = async (req, res) => {
    try {
        const customerObject = await Customer.create({
            "firstName": req.body.firstName,
            "lastName": req.body.lastName,
            "mobileNumber": req.body.mobileNumber,
            "DOB": req.body.dob,
            "address": req.body.addressLine,
            "emailID": req.body.emailId,
            "status": req.body.status
        });

        res.status(201).json({
            code: 201,
            status: 'success',
            message: `New customer for emailId - ${customerObject.emailID} created!`,
            data: customerObject
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            res.status(400).json({code: 400, status: 'failure', message: err.message, data: err});
        } else {
            res.status(500).json({code: 500, status: 'failure', message: 'Something went wrong', data: err});
        }
    }

}