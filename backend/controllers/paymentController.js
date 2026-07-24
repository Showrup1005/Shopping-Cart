const asyncHandler = require('express-async-handler');
const stripe = require('../config/stripe'); 
const Order = require('../models/orderModel');

// @desc    Create Stripe Payment Intent
// @route   POST /api/payments/create-payment-intent
// @access  Private
const createPaymentIntent = asyncHandler(async (req, res) => {
    const { orderId } = req.body;

    // 1. Fetch order from DB
    const order = await Order.findById(orderId);

    if (!order) {
        res.status(404);
        throw new Error('Order not found');
    }

    // Security Check: Verify user owns this order
    if (order.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Not authorized to process payment for this order');
    }

    // 2. Stripe expects amounts in cents/smallest currency unit (e.g., $10.50 -> 1050)
    const amountInCents = Math.round(order.total * 100);

    // 3. Create the PaymentIntent with metadata linking back to orderId
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: 'usd',
        metadata: {
            orderId: order._id.toString(),
            userId: req.user.id.toString(),
        },
    });

    // 4. Return clientSecret to React frontend
    res.status(200).json({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
    });
});

// @desc    Stripe Webhook Listener
// @route   POST /api/payments/webhook
// @access  Public (Called by Stripe servers)
const stripeWebhook = asyncHandler(async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        // Construct event using raw body buffer from express.raw()
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
        console.error(`Webhook Signature Verification Failed: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle specific event types
    switch (event.type) {
        case 'payment_intent.succeeded': {
            const paymentIntent = event.data.object;
            const orderId = paymentIntent.metadata.orderId;

            console.log(`Payment succeeded for Order ID: ${orderId}`);

            // Update order status in MongoDB
            await Order.findByIdAndUpdate(orderId, {
                paymentStatus: 'Paid',
                orderStatus: 'Processing',
                paidAt: Date.now(),
            });

            break;
        }

        case 'payment_intent.payment_failed': {
            const paymentIntent = event.data.object;
            const orderId = paymentIntent.metadata.orderId;

            console.log(`Payment failed for Order ID: ${orderId}`);

            await Order.findByIdAndUpdate(orderId, {
                paymentStatus: 'Failed',
            });

            break;
        }

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Acknowledge receipt of the event to Stripe
    res.status(200).json({ received: true });
});

module.exports = {
    createPaymentIntent,
    stripeWebhook,
};