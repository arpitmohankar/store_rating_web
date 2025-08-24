const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');
const verifyToken = require('../middleware/authMiddleware');
const { isAdmin, isUserOrAdmin } = require('../middleware/roleMiddleware');

router.use(verifyToken);
router.post('/submit', isUserOrAdmin, ratingController.submitRating);
router.get('/user/:storeId', isUserOrAdmin, ratingController.getUserRating);
router.get('/store/:storeId', ratingController.getStoreRatings);
router.get('/count', isAdmin, ratingController.getTotalRatingsCount);
module.exports = router;
