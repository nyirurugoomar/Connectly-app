const mongoose = require('mongoose');

const userInfoSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    passportNumber: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
     
},{timestamps: true})

const UserInfo = mongoose.model('UserInfo', userInfoSchema);

module.exports = UserInfo;