const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validateEmail, validatePassword } = require('../utils/validators');

const generateToken = (userId, email, role) => {
return jwt.sign(
        { id: userId, email, role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
};

const register = async (req, res) => {
try {
    const { name, email, password, address } = req.body;
        if (!name || !email || !password || !address) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }
        if (name.length < 20 || name.length > 60) {
            return res.status(400).json({
                success: false,
                message: 'Name must be between 20 and 60 characters'
            });
        }
        if (address.length > 400) {
            return res.status(400).json({
                success: false,
                message: 'Address cannot exceed 400 characters'
            });
        }
        if (!validateEmail(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please enter a valid email'
            });
        }
        if (!validatePassword(password)) {
            return res.status(400).json({
                success: false,
                message: 'Password must be 8-16 characters with at least one uppercase and one special character'
            });
        }

        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'User with this email already exists'
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            address,
            role: 'user'
        });

        const token = generateToken(newUser.id, newUser.email, newUser.role);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Error registering user'
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }
const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const token = generateToken(user.id, user.email, user.role);

        res.json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Error logging in'
        });
    }
};

const changePassword = async (req, res) => {
    try {
        const userId = req.user.id; 
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'Current password and new password are required'
            });
        }

        if (!validatePassword(newPassword)) {
            return res.status(400).json({
                success: false,
                message: 'New password must be 8-16 characters with at least one uppercase and one special character'
            });
        }

const user = await User.findByEmail(req.user.email);
const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Current password is incorrect'
            });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.updatePassword(userId, hashedPassword);

        res.json({
            success: true,
            message: 'Password changed successfully'
        });

    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({
            success: false,
            message: 'Error changing password'
        });
    }
};

module.exports = {register,login,changePassword};
