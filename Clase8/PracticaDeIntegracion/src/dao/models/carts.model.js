const mongoose = require("mongoose");

const cartsCollection = "carts";

const cartsSchema = new mongoose.Schema({
    id: Number,
    products: Array
});

const cartModel = mongoose.model(cartsCollection, cartsSchema);

module.exports = cartModel;