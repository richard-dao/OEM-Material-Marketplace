require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;

const authControllers = require('./controllers/auth');
const openAIControllers = require('./controllers/bot')

const stripe = require('stripe')('sk_test_51PeVPZBU2q4rUnSV27CHzZLUUXFqIH9sNR56WZhhROVIRP3W1qr5RKD97RTdSjUoHSZ2GXK7OEih7PXukQZ9FJfO00lBLbjdiv');
const YOUR_DOMAIN = 'http://localhost:3000';

// Middleware
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


// Controller Listeners

app.post('/api/signup', authControllers.signup);
app.post('/api/login', authControllers.login);
app.post('/api/bot', openAIControllers.botEndpoint);
app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: 'price_1PeVhXBU2q4rUnSV7NoMjLQ2',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });
  
    res.redirect(303, session.url);
  });


app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);

    // For debugging, remove later
    const users = await authControllers.getUsers();
    console.log('All users at server start: ', users);

});
