const express = require('express');
const router = express.Router();
const { createService, getServices, getServiceById, updateService, deleteService } = require('../controllers/Service.controller');

router.post('/', createService);
router.get('/', getServices);
router.get('/:id', getServiceById);
router.put('/:id', updateService);
router.delete('/:id', deleteService);

module.exports = router;