var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: 'No first name entered'
    },
    lastName: {
        type: String,
        required: 'No last name entered'
    },
    address: {
        type: String,
        required: 'No address entered'
    },
    paymentType: {
        type: String,
        required: 'Select a payment method'
    },
    orderItem: {
        type: String,
        required: 'Select a order item'
    },
    orderUnit: {
        type: Number,
        required: 'Select a order amount'
    },
    orderAddon: {
        type: String
    },
    orderComment: {
        type: String
    }
});

module.exports = mongoose.model('order', orderSchema);