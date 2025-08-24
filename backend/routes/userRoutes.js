const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/roleMiddleware');

router.use(verifyToken);
router.get('/profile', userController.getProfile);
router.get('/', isAdmin, userController.getAllUsers);
router.post('/create', isAdmin, userController.createUser);
router.get('/:id', isAdmin, userController.getUserById);
module.exports = router;
