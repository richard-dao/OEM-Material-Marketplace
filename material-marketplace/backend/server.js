const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;

const authControllers = require('./controllers/auth');

// Middleware
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


// Controller Listeners

app.post('/api/signup', authControllers.signup);
app.post('/api/login', authControllers.login);


app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);

    // For debugging, remove later
    const users = await authControllers.getUsers();
    console.log('All users at server start: ', users);

});
