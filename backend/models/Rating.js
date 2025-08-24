const pool = require('../config/database');

class Rating {
static async upsert(userId, storeId, rating) {
    try {
    const query = `
                INSERT INTO ratings (user_id, store_id, rating) 
                VALUES ($1, $2, $3)
                ON CONFLICT (user_id, store_id) 
                DO UPDATE SET rating = $3, updated_at = CURRENT_TIMESTAMP
                RETURNING *
            `;
            const result = await pool.query(query, [userId, storeId, rating]);
            return result.rows[0];
        } catch (error) {
            console.error('Error upserting rating:', error);
            throw error;
        }
    }
static async findUserRating(userId, storeId) {
    try {const query = 'SELECT * FROM ratings WHERE user_id = $1 AND store_id = $2';
            const result = await pool.query(query, [userId, storeId]);
            return result.rows[0];
        } catch (error) {
            console.error('Error finding user rating:', error);
            throw error;
        }
    }
static async findByStoreId(storeId) {
        try {
            const query = `
                SELECT r.*, u.name as user_name, u.email as user_email
                FROM ratings r
                JOIN users u ON r.user_id = u.id
                WHERE r.store_id = $1
                ORDER BY r.created_at DESC
            `;
            const result = await pool.query(query, [storeId]);
            return result.rows;
        } catch (error) {
            console.error('Error finding store ratings:', error);
            throw error;
        }
    }

static async countAll() {
        try {
            const query = 'SELECT COUNT(*) as count FROM ratings';
            const result = await pool.query(query);
            return parseInt(result.rows[0].count);
        } catch (error) {
            console.error('Error counting ratings:', error);
            throw error;
        }
    }
}
module.exports = Rating;
