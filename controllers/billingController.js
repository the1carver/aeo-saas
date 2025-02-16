const User = require('../models/User');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createSubscription = async (req, res) => {
  try {
    // Add subscription creation logic here
    res.status(201).json({ message: 'Subscription created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSubscription = async (req, res) => {
  try {
    // Add get subscription logic here
    res.status(200).json({ message: 'Subscription retrieved successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.cancelSubscription = async (req, res) => {
  try {
    // Add subscription cancellation logic here
    res.status(200).json({ message: 'Subscription cancelled successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCheckoutSession = async (req, res) => {
  try {
    const { priceId } = req.body;
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/billing`,
      client_reference_id: req.user.userId, // To identify the user in webhook
    });
    return res.json({ url: session.url });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('⚠️ Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Get the object from the event
  const dataObject = event.data.object;

  try {
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = dataObject;
        console.log(`Payment for ${paymentIntent.amount} succeeded.`);
        // You might want to update order status, send confirmation email, etc.
        break;
      }

      case 'payment_method.attached': {
        const paymentMethod = dataObject;
        console.log(`Payment method ${paymentMethod.id} attached to customer ${paymentMethod.customer}`);
        break;
      }

      case 'checkout.session.completed': {
        const session = dataObject;
        await User.findByIdAndUpdate(session.client_reference_id, {
          subscriptionStatus: 'active',
          customerId: session.customer,
          subscriptionId: session.subscription
        });
        console.log(`Subscription activated for user ${session.client_reference_id}`);
        break;
      }

      case 'customer.subscription.deleted':
      case 'customer.subscription.canceled': {
        const subscription = dataObject;
        await User.findOneAndUpdate(
          { customerId: subscription.customer },
          { subscriptionStatus: 'inactive', subscriptionId: null }
        );
        console.log(`Subscription cancelled for customer ${subscription.customer}`);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = dataObject;
        const user = await User.findOne({ customerId: invoice.customer });
        if (user) {
          console.log(`⚠️ Payment failed for user ${user.email}`);
          // TODO: Send email notification to user
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return res.json({ received: true });
  } catch (err) {
    console.error('Error processing webhook:', err);
    return res.status(500).json({ error: 'Webhook processing failed' });
  }
}; 