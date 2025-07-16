const ServiceForm = require("../models/ServiceForm");

const createServiceForm = async (req, res) => {
  try {
    const {
      serviceId,
      name,
      email,
      phone,
      address,
      city,
      date,
      additionalNotes,
    } = req.body;
    if (
      !serviceId ||
      !name ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !date ||
      !additionalNotes
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const serviceForm = await ServiceForm.create({
      user: req.user._id,
      service: serviceId,
      name,
      email,
      phone,
      address,
      city,
      date,
      additionalNotes,
    });
    await serviceForm.populate('user', 'fullName email role');
    await serviceForm.populate('service', 'name description');

    res.status(201).json(serviceForm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getServiceForms = async (req, res) => {
  try {
    const query = req.user.role === 'admin' ? {} : { user: req.user._id };
    const serviceForms = await ServiceForm.find(query)
      .populate('user', 'fullName email role')
      .populate('service', 'name description');
    
    res.status(200).json(serviceForms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getServiceFormById = async (req, res) => {
  try {
    const serviceForm = await ServiceForm.findById(req.params.id)
      .populate('user', 'fullName email role')
      .populate('service', 'name description');
      
    if (!serviceForm) {
      return res.status(404).json({ message: "Service form not found" });
    }
    if (req.user.role !== 'admin' && serviceForm.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not authorized to view this service form" });
    }
    res.status(200).json(serviceForm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateServiceForm = async (req, res) => {
    try {
      const serviceForm = await ServiceForm.findById(req.params.id);
      
      if (!serviceForm) {
        return res.status(404).json({ message: 'Service form not found' });
      }
  
      // Check if user can update this form (admin or owner)
      if (req.user.role !== 'admin' && serviceForm.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Access denied' });
      }
  
      const updatedForm = await ServiceForm.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      )
      .populate('user', 'fullName email role')
      .populate('service', 'name description');
  
      res.status(200).json(updatedForm);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const deleteServiceForm = async (req, res) => {
    try {
      const serviceForm = await ServiceForm.findById(req.params.id);
      
      if (!serviceForm) {
        return res.status(404).json({ message: 'Service form not found' });
      }
  
      // Check if user can delete this form (admin or owner)
      if (req.user.role !== 'admin' && serviceForm.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Access denied' });
      }
  
      await ServiceForm.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Service form deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

module.exports = {
  createServiceForm,
  getServiceForms,
  getServiceFormById,
  updateServiceForm,
  deleteServiceForm,
};