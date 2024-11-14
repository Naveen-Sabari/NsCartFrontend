

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'config/config.env') });



const express = require('express');
const Stripe = require('stripe');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

// Load Stripe using the STRIPE_SECRET_KEY from the environment variable
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); 

app.post("/checkout", async (req, res) => {
  try {
    const line_items = req.body.items.map(item => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.name, 
          images: [item.image], 
        },
        unit_amount: item.price * 100, 
      },
      quantity: item.quantity, 
    }));

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: 'payment',
      success_url: "https://nscartbackend-5.onrender.com/success.html",
      cancel_url: "https://nscartbackend-5.onrender.com/cancel.html",
    });
    
    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(4242, () => console.log('App is running on port 4242'));
