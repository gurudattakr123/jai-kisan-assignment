const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

const cardSchema = new mongoose.Schema({
    cardNumber: {
        type: Number
    },
    cardType: {
        type: String,
        enum: ['REGULAR', 'SPECIAL']
    },
    customerName: {
        type: String
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'INACTIVE'],
        default: 'ACTIVE'
    },
    vision: {
        type: String
    },
    customerID: {
        type: String, 
        ref: 'Customer'
    }
});
cardSchema.plugin(autoIncrement, {inc_field: 'cardNumber'});

module.exports = mongoose.model('Card', cardSchema);