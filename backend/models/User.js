const pool = require('../config/database');

class User {
static async findAll() {
    try{
        const query = 'SELECT id, name, email, address, role, created_at FROM users';
        const result = await pool.query(query);
        return result.rows;
        } 
        catch (error) {
            console.error('Error finding users:', error);
            throw error;
        }
    }
static async findByEmail(email) {
        try {
            const query = 'SELECT * FROM users WHERE email = $1';
            const result = await pool.query(query, [email]);
            return result.rows[0];
        } catch (error) {
            console.error('Error finding user by email:', error);
            throw error;
        }
}  
static async findById(id) {
        try { const query = 'SELECT id, name, email, address, role, created_at FROM users WHERE id = $1';
            const result = await pool.query(query, [id]);
            return result.rows[0];
        }
        catch (error) {
        console.error('Error finding user by id:', error);
            throw error;
        }
}

  
static async create(userData) {
        const { name, email, password, address, role } = userData;
        try {
            const query = `
                INSERT INTO users (name, email, password, address, role) 
                VALUES ($1, $2, $3, $4, $5) 
                RETURNING id, name, email, address, role, created_at
            `;
            const values = [name, email, password, address, role || 'user'];
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
}

static async updatePassword(userId, hashedPassword) {
        try {
            const query = 'UPDATE users SET password = $1 WHERE id = $2';
            await pool.query(query, [hashedPassword, userId]);
            return true;
        } catch (error) {
            console.error('Error updating password:', error);
            throw error;
        }
}
}

module.exports = User;
