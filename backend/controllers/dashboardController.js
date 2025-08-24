// controllers/dashboardController.js
const pool = require('../config/database');

// Admin dashboard data
const getAdminDashboard = async (req, res) => {
    try {
        // Get total users count
        const usersQuery = 'SELECT COUNT(*) as count FROM users';
        const usersResult = await pool.query(usersQuery);
        const totalUsers = parseInt(usersResult.rows[0].count);

        // Get total stores count
        const storesQuery = 'SELECT COUNT(*) as count FROM stores';
        const storesResult = await pool.query(storesQuery);
        const totalStores = parseInt(storesResult.rows[0].count);

        // Get total ratings count
        const ratingsQuery = 'SELECT COUNT(*) as count FROM ratings';
        const ratingsResult = await pool.query(ratingsQuery);
        const totalRatings = parseInt(ratingsResult.rows[0].count);

        // Get users by role
        const roleQuery = `
            SELECT role, COUNT(*) as count 
            FROM users 
            GROUP BY role
        `;
        const roleResult = await pool.query(roleQuery);

        res.json({
            success: true,
            data: {
                totalUsers,
                totalStores,
                totalRatings,
                usersByRole: roleResult.rows
            }
        });

    } catch (error) {
        console.error('Error fetching admin dashboard:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching dashboard data'
        });
    }
};

// Store owner dashboard data
const getStoreOwnerDashboard = async (req, res) => {
    try {
        const ownerId = req.user.id;

        // Get store details with ratings
        const storeQuery = `
            SELECT 
                s.*,
                COALESCE(AVG(r.rating), 0) as average_rating,
                COUNT(r.id) as total_ratings
            FROM stores s
            LEFT JOIN ratings r ON s.id = r.store_id
            WHERE s.owner_id = $1
            GROUP BY s.id
        `;
        const storeResult = await pool.query(storeQuery, [ownerId]);

        if (!storeResult.rows[0]) {
            return res.status(404).json({
                success: false,
                message: 'No store found for this owner'
            });
        }

        const store = storeResult.rows[0];

        // Get list of users who rated the store with their ratings
        const ratingsQuery = `
            SELECT 
                r.*,
                u.name as user_name,
                u.email as user_email
            FROM ratings r
            JOIN users u ON r.user_id = u.id
            WHERE r.store_id = $1
            ORDER BY r.created_at DESC
        `;
        const ratingsResult = await pool.query(ratingsQuery, [store.id]);

        res.json({
            success: true,
            data: {
                store: {
                    id: store.id,
                    name: store.name,
                    email: store.email,
                    address: store.address,
                    averageRating: parseFloat(store.average_rating),
                    totalRatings: parseInt(store.total_ratings)
                },
                ratings: ratingsResult.rows
            }
        });

    } catch (error) {
        console.error('Error fetching store owner dashboard:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching dashboard data'
        });
    }
};

// User dashboard data
const getUserDashboard = async (req, res) => {
    try {
        const userId = req.user.id;

        // Get all stores with user's ratings
        const query = `
            SELECT 
                s.id,
                s.name,
                s.email,
                s.address,
                COALESCE(AVG(r.rating), 0) as average_rating,
                COUNT(DISTINCT r.id) as total_ratings,
                ur.rating as user_rating
            FROM stores s
            LEFT JOIN ratings r ON s.id = r.store_id
            LEFT JOIN ratings ur ON s.id = ur.store_id AND ur.user_id = $1
            GROUP BY s.id, ur.rating
            ORDER BY s.name ASC
        `;
        const result = await pool.query(query, [userId]);

        res.json({
            success: true,
            data: result.rows.map(store => ({
                ...store,
                average_rating: parseFloat(store.average_rating),
                total_ratings: parseInt(store.total_ratings),
                user_rating: store.user_rating || null
            }))
        });

    } catch (error) {
        console.error('Error fetching user dashboard:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching dashboard data'
        });
    }
};

module.exports = {
    getAdminDashboard,
    getStoreOwnerDashboard,
    getUserDashboard
};
