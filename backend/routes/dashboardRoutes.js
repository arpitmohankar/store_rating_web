const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const verifyToken = require('../middleware/authMiddleware');
const { isAdmin, isStoreOwner, isUserOrAdmin } = require('../middleware/roleMiddleware');

router.use(verifyToken);
router.get('/admin', isAdmin, dashboardController.getAdminDashboard);
router.get('/store-owner', isStoreOwner, dashboardController.getStoreOwnerDashboard);
router.get('/user', isUserOrAdmin, dashboardController.getUserDashboard);
module.exports = router;
