const mongoose = require("mongoose");

const PizzaVariantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const PredefinedPizzaSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId },
  pizza: {
    name: { type: String, required: true },
    varients: ["small", "99"],
    category: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
  },
});

const CustomPizzaSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: "User" },
  pizza: {
    base: { type: String, enum: ["Stuffed Crust", "Cracker Crust", "Flat Bread Crust", "Thin Crust", "Cheese Crust Pizza"], required: true },
    sauce: { type: String, enum: ["Pesto", "White Garlic Sauce", "Garlic Ranch Sauce", "Hummus", "Buffalo Sauce", "Marinara Sauce"], required: true },
    cheese: { type: String, enum: ["Mozzarella Cheese", "Provolone Cheese", "Cheddar Cheese", "Parmesan Cheese", "Gouda", "Goat Cheese", "Gruyere", "Ricotta"], required: true },
    veggies: [{ type: String, enum: ["Fresh Tomatoes", "Peppers", "Zucchini", "Zucchini Flowers", "Eggplants", "Mushrooms", "Artichokes", "Onion", "Broccoli Rabe", "Potatoes", "Radicchio"], required: true }],
  },
  price: { type: Number, required: true },
});

const PizzaInfoSchema = new mongoose.Schema({
  isPredefined: { type: Boolean, required: true },
  predefinedPizza: PredefinedPizzaSchema,
  customPizza: CustomPizzaSchema,
  quantity: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    hNo: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },
    pinCode: {
      type: Number,
      required: true,
    },
    phoneNo: {
      type: Number,
      required: true,
    },
  },

  pizzas: [PizzaInfoSchema],

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  paymentMethod: {
    type: "String",
    enum: ["COD", "Online"],
    default: "COD",
  },

  paymentInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment", // Reference to the Payment model
  },
  paidAt: Date,

  itemsPrice: {
    type: Number,
    default: 0,
  },
  taxPrice: {
    type: Number,
    default: 0,
  },
  shippingCharges: {
    type: Number,
    default: 0,
  },
  totalAmount: {
    type: Number,
    default: 0,
  },

  orderStatus: {
    type: String,
    enum: ["Preparing", "Shipped", "Delivered"],
    default: "Preparing",
  },

  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
