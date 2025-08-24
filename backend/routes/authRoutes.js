const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/change-password', verifyToken, authController.changePassword);
router.get('/test', (req, res) => {
    res.json({ message: 'Auth routes working!' });
});
module.exports = router;
