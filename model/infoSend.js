const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Sms = mongoose.Sms;
// const Email = mongoose.Email;

const infoSendSchema = new Schema({
    usuarioId: {
        type: Schema.Types.ObjectId,
    },
    date: {
        type: Date,
        default: Date.now
    },
    entidad: {
        type: String,
        trim: true,
    },
    modulo: {
        type: String,
        trim: true,
    },
    accion: {
        type: String,
        trim: true,
    },
    operator: {
        type: String,
        trim: true,
    },
    endPoint: {
        type: String,
        trim: true,
    },
    other: {
        type: String,
        trim: true,
    },
    messages: [
        {
            send: {
                type: Date,
                default: Date.now
            },
            phone: {
                type: String,
                trim: true,
            },
            sms: {
                type: String,
                trim: true,
            },
        }
    ],
    emails: [
        {
            send: {
                type: Date,
                default: Date.now
            },
            from: {
                type: String,
                trim: true,
            },
            subject: {
                type: String,
                trim: true,
            },
            name: {
                type: String,
                trim: true,
            },
            phone: {
                type: String,
                trim: true,
            },
            message: {
                type: String,
                trim: true,
            },
            attachment: [Buffer]
        }
    ]
    //name, email, phone, message

});
module.exports = mongoose.model('InfoSend', infoSendSchema);