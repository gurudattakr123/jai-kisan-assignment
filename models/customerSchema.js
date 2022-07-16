const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'This field is required.'
    },
    email: {
        type: String
    },
    mobile: {
        type: String,
        max: 12
    },
    city: {
        type: String
    }
});

const customerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true,
        max: 10
    },
    DOB: {
        type: Date
    },
    address: {
        type: String
    },
    customerID: {
        type: String
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'INACTIVE'],
        default: 'ACTIVE'
    },
    emailID: {
        type: String,
        required: true
    },
    cards: cardSchema
});


module.exports = mongoose.model('Customer', customerSchema); // mongoose automatically look for lower case and plural version of model name in mongodb
const Card = mongoose.model('Card', cardSchema);
