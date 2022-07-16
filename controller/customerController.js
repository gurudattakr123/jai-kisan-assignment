const Customer = require('../models/customerSchema')
const uuid = require('uuid')

exports.getCustomerDetails = (req, res) => {
    try{
        Customer.findOne({ 'customerID': req.params.customerId }, function (error, result) {
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

exports.getallCustomers = (req, res) => {
    try{
        Customer.find({}, function (error, result) {
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

exports.deleteCustomer = (req, res) => {
    try{
        Customer.findOneAndDelete({ 'customerID': req.params.customerId }, function (error, result) {
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

exports.createCustomer = async (req, res) => {
    try {
        const customerObject = await Customer.create({
            "firstName": req.body.firstName,
            "lastName": req.body.lastName,
            "mobileNumber": req.body.mobileNumber,
            "DOB": req.body.dob,
            "address": req.body.addressLine,
            "customerID": uuid.v4(),
            "emailID": req.body.emailId
        });

        res.status(201).json({ code: 201, status: 'success', message: `New customer for emailId - ${customerObject.emailID} created!`, data: customerObject });
    } catch (err) {
        res.status(500).json({ code: 500, status: 'failure', message: 'Something went wrong', data: err });
    }

}