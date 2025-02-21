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