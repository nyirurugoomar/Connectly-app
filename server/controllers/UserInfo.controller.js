const UserInfo = require('../models/UserInfo');

const createUserInfo = async (req, res) => {
    const {passportNumber, address, phoneNumber} = req.body;
    if(!passportNumber || !address || !phoneNumber){
        return res.status(400).json({message: 'All fields are required'});
    }
    try {
        const existingUserInfo = await UserInfo.findOne({user: req.user._id});
        let userInfo;
        if(existingUserInfo){
            // Update existing user info
            userInfo = await UserInfo.findByIdAndUpdate(
                existingUserInfo._id, 
                {passportNumber, address, phoneNumber}, 
                {new: true}
            );
            res.status(200).json({...userInfo.toObject(), updated: true});
        } else {
            // Create new user info
            userInfo = await UserInfo.create({user: req.user._id, passportNumber, address, phoneNumber});
            res.status(201).json({...userInfo.toObject(), created: true});
        }
    } catch (error) {
        if (error.code === 11000) {
            // Duplicate key error (passport number or phone number already exists)
            return res.status(400).json({message: 'Passport number or phone number already exists'});
        }
        console.error('Error in createUserInfo:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}

const getUserInfo = async (req, res) => {
    const userInfo = await UserInfo.find({user: req.user._id});
    res.status(200).json(userInfo);
}

const updateUserInfo = async (req, res) => {
    const {passportNumber, address, phoneNumber} = req.body;
    const userInfo = await UserInfo.findByIdAndUpdate(req.params.id, {passportNumber, address, phoneNumber}, {new: true});
    res.status(200).json(userInfo);
}

const deleteUserInfo = async (req, res) => {
    const userInfo = await UserInfo.findByIdAndDelete(req.params.id);
    res.status(200).json(userInfo);
}

module.exports = {createUserInfo, getUserInfo, updateUserInfo, deleteUserInfo};