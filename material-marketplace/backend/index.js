require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const { Pool } = require('pg');
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());



const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const getUsers = async () => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM auth');
        client.release();
        return result.rows;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
};

getUsers().then(users => {
    console.log('Users: ', users);
}).catch(error => {
    console.error('Error: ', error);
});

app.post('/api/signup', (req, res) => {
    const { email, password, companyName } = req.body;

    console.log('User signed up:', { email, companyName });

    res.json({ message: 'User signed up successfully' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
