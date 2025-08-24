const pool = require('../config/database');

class Store {
static async findAll() {
    try {
            const query = `
                SELECT 
                    s.id, 
                    s.name, 
                    s.email, 
                    s.address,
                    s.owner_id,
                    COALESCE(AVG(r.rating), 0) as average_rating,
                    COUNT(r.id) as total_ratings
                FROM stores s
                LEFT JOIN ratings r ON s.id = r.store_id
                GROUP BY s.id
                ORDER BY s.created_at DESC
            `;
        const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            console.error('Error finding stores:', error);
            throw error;
        }
    }


static async findById(id) {
        try {
            const query = `
                SELECT 
                    s.*,
                    COALESCE(AVG(r.rating), 0) as average_rating,
                    COUNT(r.id) as total_ratings
                FROM stores s
                LEFT JOIN ratings r ON s.id = r.store_id
                WHERE s.id = $1
                GROUP BY s.id
            `;
            const result = await pool.query(query, [id]);
            return result.rows[0];
        } catch (error) {
            console.error('Error finding store:', error);
            throw error;
        }
    }

static async create(storeData) {
const { name, email, address, owner_id } = storeData;
        try {
            const query = `
                INSERT INTO stores (name, email, address, owner_id) 
                VALUES ($1, $2, $3, $4) 
                RETURNING *
            `;
            const values = [name, email, address, owner_id];
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Error creating store:', error);
            throw error;
        }
    }

static async findByOwnerId(ownerId) {
        try {
            const query = `
                SELECT 
                    s.*,
                    COALESCE(AVG(r.rating), 0) as average_rating,
                    COUNT(r.id) as total_ratings
                FROM stores s
                LEFT JOIN ratings r ON s.id = r.store_id
                WHERE s.owner_id = $1
                GROUP BY s.id
            `;
    const result = await pool.query(query, [ownerId]);
    return result.rows[0];
        } catch (error) {
            console.error('Error finding store by owner:', error);
            throw error;
        }
    }
}

module.exports = Store;
