const express = require('express');
const router = express.Router();
const { 
  createCheckoutSession, 
  handleWebhook,
  getSubscription,
  cancelSubscription 
} = require('../controllers/billingController');
const auth = require('../middleware/auth');

router.post('/create-checkout-session', auth, createCheckoutSession);
router.get('/subscription', auth, getSubscription);
router.delete('/subscription', auth, cancelSubscription);
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

module.exports = router; 