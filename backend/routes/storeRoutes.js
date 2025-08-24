const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const verifyToken = require('../middleware/authMiddleware');
const { isAdmin, isStoreOwner } = require('../middleware/roleMiddleware');

router.get('/', storeController.getAllStores);
router.get('/:id', storeController.getStoreById);
router.use(verifyToken);
router.post('/create', isAdmin, storeController.createStore);
router.get('/my/store', isStoreOwner, storeController.getMyStore);
module.exports = router;
