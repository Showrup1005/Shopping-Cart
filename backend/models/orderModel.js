const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
            quantity: Number,
            price: Number, 
        },
    ],

    subtotal: Number,
    tax: Number,
    total: Number,

    paymentStatus: {
        type: String,
        enum: ["Pending", "Paid", "Failed"],
        default: "Pending",
    },

    orderStatus: {
        type: String,
        enum: ["Pending", "Processing", "Shipped", "Delivered"],
        default: "Pending",
    },
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);