const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'config/config.env') });

const express = require('express');
const Stripe = require('stripe');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Load Stripe using the STRIPE_SECRET_KEY from the environment variable
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// CORS Setup (allow specific origins for production)
const allowedOrigins = [
  "https://673afb851ef44f00084ac20d--nscartin.netlify.app", // Replace with your actual frontend URL
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // For serving static files

// Checkout API endpoint
app.post("/checkout", async (req, res) => {
  try {
    // Extracting line items from the request body
    const line_items = req.body.items.map(item => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.name,
          images: [item.image], // Assuming image URL is provided
        },
        unit_amount: item.price * 100, // Stripe expects price in the smallest currency unit (paise for INR)
      },
      quantity: item.quantity,
    }));

    // Create a Checkout session with Stripe
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: 'payment',
      success_url: "https://nscartbackend-1.onrender.com/success.html", // Ensure these URLs are accessible
      cancel_url: "https://nscartbackend-1.onrender.com/cancel.html",  // Ensure these URLs are accessible
    });

    // Respond with the session ID to the frontend
    res.status(200).json({ id: session.id });

  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).send({ message: 'Internal Server Error', error: error.message });
  }
});

// Start the server on port 4242
app.listen(4242, () => console.log('App is running on port 4242'));
