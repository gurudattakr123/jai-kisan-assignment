const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);
const Customer = require('./customerSchema')

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

cardSchema.pre('deleteOne', async function (next) {
    try {
        await this.deleteOne({_id: this._id});
        next()
    } catch (err) {
        next(err)
    }
})

module.exports = mongoose.model('Card', cardSchema);