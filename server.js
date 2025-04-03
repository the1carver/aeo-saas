require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const billingRoutes = require('./routes/billing');
const aeoRoutes = require('./routes/aeo');

const app = express();

// Connect MongoDB
connectDB();

// Stripe webhook handling
app.use((req, res, next) => {
  if (req.originalUrl === '/api/billing/webhook') {
    next();
  } else {
    express.json()(req, res, next);
  }
});

app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/aeo', aeoRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 
// server.js

// Put standard requires at the top
const express = require('express');
// const mongoose = require('mongoose'); // Add other necessary requires here
// const path = require('path');

// Only require and configure dotenv if NODE_ENV is not 'production'
if (process.env.NODE_ENV !== 'production') {
  try {
    require('dotenv').config();
    console.log('dotenv loaded for development environment.'); // Optional: Good for debugging
  } catch (error) {
    console.error('Error loading dotenv:', error);
    // Decide if you want the app to exit if dotenv fails in dev
    // process.exit(1);
  }
}

// --- Rest of your server setup ---
const app = express();

// Example: Access environment variables (DigitalOcean provides these directly in production)
const port = process.env.PORT || 4000; // Use PORT from environment or default
const mongoUri = process.env.MONGO_URI;

// Example middleware
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('App is running!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  if (!mongoUri) {
     console.warn('Warning: MONGO_URI environment variable is not set.');
  }
});

// ... other server logic, database connection, etc.
