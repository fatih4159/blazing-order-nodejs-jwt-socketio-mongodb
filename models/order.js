const mongoose = require("mongoose");

const Order = mongoose.model(
    "Order",
    new mongoose.Schema({
        ordered:{
            at: Date,
            by: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
        },
        table: {
            type: String,
        },
        served:{
            at: Date,
            by: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
        },
        placed:{
            at: Date,
            by: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },

        },
        products: {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            amount: {
                type: Number,
                default: 0
            },
        },
        isDone: {
            type: Boolean,
            default: false,
        },
    })
);

module.exports = Order;
