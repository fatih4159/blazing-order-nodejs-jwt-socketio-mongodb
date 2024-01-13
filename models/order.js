const mongoose = require("mongoose");

const Order = mongoose.model(
    "Order",
    new mongoose.Schema({
        orderId: {
            type: Number,
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
        roomName: {
            type: String,
            required: true,
        },
        table: {
            type: String,
            required: true,
        },
        hasBeenServed: {
            type: Boolean,
            default: false,
        },
        hasBeenPlaced: {
            type: Boolean,
            default: false,
        },
        products: {
            type: Map,
            key: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            value: {
                type: Number,
                required: true
            },
            required: true,
        },
        totalUnpaidPrice: {
            type: Number,
            required: true,
            default: 0,
        },
        totalPaidPrice: {
            type: Number,
            required: true,
            default: 0,
        },
        isDone: {
            type: Boolean,
            default: false,
        },
        orderOrigin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    })
);

module.exports = Order;
