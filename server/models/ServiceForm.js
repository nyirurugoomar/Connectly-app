const mongoose = require('mongoose');

const serviceFormSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    additionalNotes:{
        type: String,
        required: true
    }
}, {timestamps: true})

const ServiceForm = mongoose.model('ServiceForm', serviceFormSchema);
module.exports = ServiceForm;