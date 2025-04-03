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
    // Use raw body for Stripe webhook
    express.raw({type: 'application/json'})(req, res, next);
  } else {
    // Use JSON parser for other routes
    express.json()(req, res, next);
  }
});

// Update CORS configuration
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:5173', // Use env var for deployed URL
    'https://frontieraeo.com', // Keep specific domains if needed
    'https://app.frontieraeo.com'
  ],
  credentials: true
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/aeo', aeoRoutes);

// Basic root route for health check or info
app.get('/', (req, res) => {
  res.send('AEO SaaS API is running.');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
