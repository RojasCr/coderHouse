const mongoose = require("mongoose");

const usersCollection = "users"

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true
    },
    age: Number,
    password: {
        type: String,
        unique:true
    }
});

const userModel = mongoose.model(usersCollection, userSchema);

module.exports = userModel;