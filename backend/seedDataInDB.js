const bcrypt = require('bcrypt');
const pool = require('./config/database');

const seedDatabase = async () => {
    try {
        console.log('Starting database seeding...');

        // Create admin user
        const adminPassword = await bcrypt.hash('Admin@123', 10);
        await pool.query(`
            INSERT INTO users (name, email, password, address, role) 
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (email) DO NOTHING
        `, ['System Administrator User', 'admin@storerating.com', adminPassword, '123 Admin Street, City', 'admin']);

        // Create some normal users
        const userPassword = await bcrypt.hash('User@123', 10);
        await pool.query(`
            INSERT INTO users (name, email, password, address, role) 
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (email) DO NOTHING
        `, ['John Doe Regular User', 'john@example.com', userPassword, '456 User Avenue, City', 'user']);

        await pool.query(`
            INSERT INTO users (name, email, password, address, role) 
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (email) DO NOTHING
        `, ['Jane Smith Normal User', 'jane@example.com', userPassword, '789 Customer Road, City', 'user']);

        // Create store owner
        const ownerPassword = await bcrypt.hash('Owner@123', 10);
        const ownerResult = await pool.query(`
            INSERT INTO users (name, email, password, address, role) 
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (email) DO UPDATE SET role = 'store_owner'
            RETURNING id
        `, ['Store Owner Person Name', 'owner@store.com', ownerPassword, '321 Store Street, City', 'store_owner']);

        if (ownerResult.rows[0]) {
            // Create a store for the owner
            await pool.query(`
                INSERT INTO stores (name, email, address, owner_id) 
                VALUES ($1, $2, $3, $4)
                ON CONFLICT DO NOTHING
            `, ['Best Electronics Store', 'store@electronics.com', '999 Shopping Mall, City Center', ownerResult.rows[0].id]);
        }

        console.log('Database seeding completed!');
        console.log('\nTest credentials:');
        console.log('Admin: admin@storerating.com / Admin@123');
        console.log('User: john@example.com / User@123');
        console.log('Store Owner: owner@store.com / Owner@123');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
