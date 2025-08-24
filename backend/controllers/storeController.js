const Store = require('../models/Store');
const User = require('../models/User');
const { validateEmail, validateName, validateAddress } = require('../utils/validators');

const getAllStores = async (req, res) => {
    try {
        const stores = await Store.findAll();
        
        res.json({
            success: true,
            data: stores
        });
    } catch (error) {
        console.error('Error fetching stores:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching stores'
        });
    }
};

const getStoreById = async (req, res) => {
    try {
        const storeId = req.params.id;
        const store = await Store.findById(storeId);
        
        if (!store) {
            return res.status(404).json({
                success: false,
                message: 'Store not found'
            });
        }

        res.json({
            success: true,
            data: store
        });
    } catch (error) {
        console.error('Error fetching store:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching store'
        });
    }
};
const createStore = async (req, res) => {
    try {
        const { name, email, address, owner_email } = req.body;
        if (!name || !email || !address || !owner_email) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        if (!validateName(name)) {
            return res.status(400).json({
                success: false,
                message: 'Store name must be between 20 and 60 characters'
            });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }

        if (!validateAddress(address)) {
            return res.status(400).json({
                success: false,
                message: 'Address cannot exceed 400 characters'
            });
        }

    const owner = await User.findByEmail(owner_email);
        if (!owner) {
            return res.status(404).json({
                success: false,
                message: 'Store owner not found with this email'
            });
        }

        const existingStore = await Store.findByOwnerId(owner.id);
        if (existingStore) {
            return res.status(409).json({
                success: false,
                message: 'This owner already has a store'
            });
        }
        const pool = require('../config/database');
        await pool.query('UPDATE users SET role = $1 WHERE id = $2', ['store_owner', owner.id]);
        const newStore = await Store.create({
            name,
            email,
            address,
            owner_id: owner.id
        });

        res.status(201).json({
            success: true,
            message: 'Store created successfully',
            data: newStore
        });

    } catch (error) {
        console.error('Error creating store:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating store'
        });
    }
};

const getMyStore = async (req, res) => {
    try {
        const ownerId = req.user.id;
        const store = await Store.findByOwnerId(ownerId);
        
        if (!store) {
            return res.status(404).json({
                success: false,
                message: 'You do not have a store'
            });
        }

        res.json({
            success: true,
            data: store
        });
    } catch (error) {
        console.error('Error fetching store:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching your store'
        });
    }
};

module.exports = {
    getAllStores,
    getStoreById,
    createStore,
    getMyStore
};
