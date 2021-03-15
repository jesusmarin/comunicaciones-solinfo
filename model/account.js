const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    usuarioId: {
        type: Schema.Types.ObjectId,
    },
    date: {
        type: Date,
        default: Date.now
    },
    authorization: {
        isEnabled: {
            type: Boolean,
            default: true
        },
        startDate: {
            type: Date,
            default: Date.now
        },
        endingDate: {
            type: Date,
            default: Date.now
        }
    },
    balance: {
        available: {
            type: Number,
            default: 0
        },
        sendSms: {
            type: Number,
            default: 0
        },
        sendEmail: {
            type: Number,
            default: 0
        },
    },
    payments: [{
        date: {
            type: Date,
            default: Date.now
        },
        amount: {
            type: Number,
            default: 0
        },
        spent: {
            type: Number,
            default: 0
        },
        reference: {
            type: String,
            trim: true,
        },
        information: {
            type: String,
            trim: true,
        },
        code: {
            type: String,
            trim: true,
        }
    }],
    methodPay: [{
        number: {
            type: Number,
            default: 0
        },
        person: {
            type: String,
            trim: true,
        },
        dateExpirian: {
            type: Date,
            default: Date.now
        },
        code: {
            type: String,
            trim: true,
        },
        optionFirst: {
            type: Boolean,
            default: true,
        }
    }]
});

module.exports = mongoose.model('Account', accountSchema);