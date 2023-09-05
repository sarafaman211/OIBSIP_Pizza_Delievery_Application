const mongoose = require("mongoose");

const IngredientSchema = new mongoose.Schema({
    ingredientId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    name: { type: String, required: true },
    category: { type: String, enum: ["Base", "Sauce", "Cheese", "Veggies"], required: true },
    stockQuantity: { type: Number, required: true },
    minimumStock: { type: Number, required: true },
});

module.exports = mongoose.model("Ingredient", IngredientSchema);

