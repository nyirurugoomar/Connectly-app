const Service = require('../models/Service');

const createService = async (req,res) => {
    try {
        const {name, description, image} = req.body;
        if(!name || !description || !image){
            return res.status(400).json({message: 'All fields are required'});
        }
        const existingService = await Service.findOne({name});
        if(existingService){
            return res.status(400).json({message: 'Service already exists'});
        }
        const service = await Service.create({name, description, image});
        res.status(201).json(service);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getServices = async (req,res) => {
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getServiceById = async (req,res) => {
    try {
        const {id} = req.params;
        const service = await Service.findById(id);
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateService = async (req,res) => {
    try {
        const {id} = req.params;
        const {name, description, image} = req.body;
        const service = await Service.findByIdAndUpdate(id, {name, description, image}, {new: true});
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteService = async (req,res) => {
    try {
        const {id} = req.params;
        await Service.findByIdAndDelete(id);
        res.status(200).json({message: 'Service deleted successfully'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    createService,
    getServices,
    getServiceById,
    updateService,
    deleteService
}
