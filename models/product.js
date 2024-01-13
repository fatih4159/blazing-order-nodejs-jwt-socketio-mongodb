const mongoose = require("mongoose");

const Product = mongoose.model(
    "Product",
    new mongoose.Schema({
        productId: Number,
        name: String,
        type: String,
        price: String,
        description: String,
        stockAmount: Number,
        stockUse: Boolean,
    })
);

module.exports = Product;
