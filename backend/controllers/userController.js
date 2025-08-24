// controllers/userController.js
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Store = require('../models/Store');
const { validateEmail, validatePassword, validateName, validateAddress } = require('../utils/validators');

// Get all users (Admin only)
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        
        res.json({
            success: true,
            data: users
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching users'
        });
    }
};

// Get single user details
const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // If user is store owner, get their store rating
        let storeData = null;
        if (user.role === 'store_owner') {
            storeData = await Store.findByOwnerId(userId);
        }

        res.json({
            success: true,
            data: {
                ...user,
                store: storeData
            }
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching user details'
        });
    }
};

// Create new user (Admin only)
const createUser = async (req, res) => {
    try {
        const { name, email, password, address, role } = req.body;

        // Validation
        if (!name || !email || !password || !address || !role) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Validate inputs
        if (!validateName(name)) {
            return res.status(400).json({
                success: false,
                message: 'Name must be between 20 and 60 characters'
            });
        }

        if (!validateAddress(address)) {
            return res.status(400).json({
                success: false,
                message: 'Address cannot exceed 400 characters'
            });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }

        if (!validatePassword(password)) {
            return res.status(400).json({
                success: false,
                message: 'Password must be 8-16 characters with at least one uppercase and one special character'
            });
        }

        // Check if user exists
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'User with this email already exists'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            address,
            role
        });

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: newUser
        });

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating user'
        });
    }
};

// Get current user profile
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching profile'
        });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    getProfile
};
