const express = require('express');
const router = express.Router();
const {createUserInfo, getUserInfo, updateUserInfo, deleteUserInfo} = require('../controllers/UserInfo.controller');
const { authenticateToken } = require('../middleware/auth');

router.use(authenticateToken);

router.post('/', createUserInfo);
router.get('/', getUserInfo);
router.put('/:id', updateUserInfo);
router.delete('/:id', deleteUserInfo);
router.get('/me', authenticateToken, async (req, res) => {
    const userInfo = await UserInfo.findOne({ user: req.user._id });
    res.json(userInfo);
});

module.exports = router;