const express = require('express');
const router = express.Router();
const {createUserInfo, getUserInfo, updateUserInfo, deleteUserInfo} = require('../controllers/UserInfo.controller');
const { authenticateToken } = require('../middleware/auth');

router.use(authenticateToken);

router.post('/', createUserInfo);
router.get('/', getUserInfo);
router.put('/:id', updateUserInfo);
router.delete('/:id', deleteUserInfo);

module.exports = router;