const mongoose = require("mongoose");

const Product = mongoose.model(
    "Product",
    new mongoose.Schema({
        name: String,
        type: String,
        price: {
            inclVAT: String,
            price: String,
        },
        description:{
            barcode: String,
            text: String,
            alergens: String,
            indregients: String,
            diets: [String],
        },
        stock:{
            use: Boolean,
            amount: Number,
        },
        created:{
            at: Date,
            by: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
        },
    })
);

module.exports = Product;
