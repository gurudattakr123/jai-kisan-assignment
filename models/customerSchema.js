const mongoose = require('mongoose');
const uuid = require('uuid')
const Card = require('./cardSchema')

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
        type: String,
        default: uuid.v1()
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
    cards:
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Card'
        }]

});

customerSchema.pre('findOneAndDelete', async function (next) {
    try {
        await Card.deleteMany(this._conditions)
        next()
    } catch (err) {
        next(err)
    }
});

module.exports = mongoose.model('Customer', customerSchema);
