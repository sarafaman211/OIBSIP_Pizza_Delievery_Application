const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    name: String,
    varients: [String],
    prices: [
        {
            small: Number,
            medium: Number,
            large: Number,
        },
    ],
    category: String,
    image: String,
    description: String,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
