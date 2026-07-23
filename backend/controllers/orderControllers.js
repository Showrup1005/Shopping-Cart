const asyncHandler = require('express-async-handler')
const Order = require('../models/orderModel')
const Cart = require('../models/cartModel')

const getOrders = asyncHandler(async (req, res) => {
    // Fetch all orders created by this user, newest first
    const orders = await Order.find({ user: req.user.id })
        .populate({
            path: 'items.product',
            select: 'title price image' // Fetch product details for order summary
        })
        .sort({ createdAt: -1 });

    res.status(200).json(orders);
})

const getOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
        .populate({
            path: 'items.product',
            select: 'title price image'
        })
        .populate({
            path: 'user',
            select: 'name email'
        });

    if (!order) {
        res.status(404);
        throw new Error('Order not found');
    }

    // Security Check: Ensure user can only access their OWN order (unless admin)
    if (order.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
        res.status(401);
        throw new Error('Not authorized to view this order');
    }

    res.status(200).json(order);
});

const createOrder = asyncHandler(async (req, res) => {

    const cart = await Cart.findOne({ user: req.user.id })
        .populate("items.product");

    if (!cart || cart.items.length === 0) {
        res.status(400);
        throw new Error("Cart is empty");
    }

    // Build order items
    const orderItems = cart.items.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price
    }));

    // Calculate subtotal
    const subtotal = orderItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const shipping = 0;
    const tax = subtotal > 0 ? 20 : 0;
    const total = subtotal + shipping + tax;

    // Create order
    const order = await Order.create({
        user: req.user.id,
        items: orderItems,
        subtotal,
        shipping,
        tax,
        total,
        paymentStatus: "Pending",
        orderStatus: "Pending"
    });
    await Cart.findOneAndDelete({ user: req.user._id })

    res.status(201).json(order);
});



module.exports = {
    createOrder,
    getOrders,
    getOrder
}