const UserInfo = require('../models/UserInfo');

const createUserInfo = async (req, res) => {
    const {passportNumber, address, phoneNumber} = req.body;
    if(!passportNumber || !address || !phoneNumber){
        return res.status(400).json({message: 'All fields are required'});
    }
    const existingUserInfo = await UserInfo.findOne({user: req.user._id});
    if(existingUserInfo){
        return res.status(400).json({message: 'User info already exists'});
    }
    const userInfo = await UserInfo.create({user: req.user._id, passportNumber, address, phoneNumber});
    res.status(201).json(userInfo);
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