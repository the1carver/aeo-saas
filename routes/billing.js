const express = require('express');
const router = express.Router();
const { createSubscription, getSubscription, cancelSubscription, createCheckoutSession, handleWebhook } = require('../controllers/billingController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/subscribe', createSubscription);
router.get('/subscription', getSubscription);
router.delete('/subscription', cancelSubscription);

// Create Stripe Checkout Session
router.post('/create-checkout-session', authMiddleware, createCheckoutSession);

// Stripe webhook
router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  handleWebhook
);

module.exports = router; 