const mongoose = require("mongoose");

const usersCollection = "users"

const userSchema = new mongoose.Schema({
    githubId: {
        type: String,
        default: null
    },
    googleId: {
        type: String,
        default: null
    },
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true,
        default: null
    },
    age: Number,
    password: {
        type: String,
        unique:true
    },
    role: {
        type: String,
        enum: ["admin", "usuario"]
    }
});

const userModel = mongoose.model(usersCollection, userSchema);

module.exports = userModel;