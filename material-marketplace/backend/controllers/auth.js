const bcrypt = require('bcrypt');
const pool = require('../db');

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

const signup = async (req, res) => {

    const { email, password, companyName } = req.body;
    const username = email.split('@')[0];

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const client = await pool.connect();
        await client.query('INSERT INTO auth (username, email, password, company_name) VALUES ($1, $2, $3, $4)', [username, email, hashedPassword, companyName]);
        client.release();
        console.log('User signed up:', {email, companyName});
        res.json({message: 'User signed up successfully'});
    } catch (error) {
        console.error('Error signing up: ', error);
        res.status(500).json({error: 'Internal Server Error'});
    }

};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM auth WHERE email = $1', [email]);
        client.release();

        if (result.rows.length > 0){
            const user = result.rows[0];
            const match = await bcrypt.compare(password, user.password);

            if (match) {
                res.json({message: 'Login successful', user: {email: user.email, companyName: user.company_name} });
            } else {
                res.status(401).json({error: 'Invalid email or password'});
            }
        } else {
            res.status(401).json({error: 'Invalid email'});
        }
    } catch (error) {
        console.error('Error loggin in: ', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

module.exports = {
    getUsers,
    signup,
    login
};