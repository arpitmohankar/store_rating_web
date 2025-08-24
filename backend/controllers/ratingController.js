const Rating = require('../models/Rating');
const Store = require('../models/Store');

const submitRating = async (req, res) => {
    try {
    const userId = req.user.id;
    const { storeId, rating } = req.body;
    if (!storeId || !rating) {
            return res.status(400).json({
                success: false,
                message: 'Store ID and rating are required'
            });
        }
        if (rating < 1 || rating > 5 || !Number.isInteger(rating)) {
            return res.status(400).json({success: false, message: 'Rating must be an integer between 1 and 5'});
        }

        const store = await Store.findById(storeId);
        if (!store) {
            return res.status(404).json({
                success: false,
                message: 'Store not found'
            });
        }

    const newRating = await Rating.upsert(userId, storeId, rating);
    res.json({
            success: true,
            message: 'Rating submitted successfully',
            data: newRating
        });

    } catch (error) {
        console.error('Error submitting rating:', error);
        res.status(500).json({
            success: false,
            message: 'Error submitting rating'
        });
    }
};

const getUserRating = async (req, res) => {
    try {
        const userId = req.user.id;
        const storeId = req.params.storeId;

        const rating = await Rating.findUserRating(userId, storeId);

        res.json({
            success: true,
            data: rating || null
        });

    } catch (error) {
        console.error('Error fetching user rating:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching rating'
        });
    }
};

const getStoreRatings = async (req, res) => {
    try {
        const storeId = req.params.storeId;
        
        const ratings = await Rating.findByStoreId(storeId);

        res.json({
            success: true,
            data: ratings
        });

    } catch (error) {
        console.error('Error fetching store ratings:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching store ratings'
        });
    }
};
const getTotalRatingsCount = async (req, res) => {
    try {
        const count = await Rating.countAll();
        
        res.json({
            success: true,
            data: { count }
        });

    } catch (error) {
        console.error('Error counting ratings:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching ratings count'
        });
    }
};

module.exports = {
    submitRating,
    getUserRating,
    getStoreRatings,
    getTotalRatingsCount
};
