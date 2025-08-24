const { Pool } = require('pg');
require('dotenv').config();
const pool = new Pool({connectionString: process.env.DATABASE_URL,ssl: {rejectUnauthorized: false}});
pool.connect((err, client, release) => {
if (err) {console.error('Error connecting to database:', err.stack);}
    else{
        console.log('Connected to NeonDB successfully');
        release();
    }});
module.exports = pool;
