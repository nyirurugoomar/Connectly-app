const express = require('express');
const router = express.Router();
const {createServiceForm, getServiceForms, getServiceFormById, updateServiceForm, deleteServiceForm} = require('../controllers/ServiceForm.controller');
const { authenticateToken } = require('../middleware/auth');

router.use(authenticateToken);

router.post('/', createServiceForm);
router.get('/', getServiceForms);
router.get('/:id', getServiceFormById);
router.put('/:id', updateServiceForm);
router.delete('/:id', deleteServiceForm);

module.exports = router;