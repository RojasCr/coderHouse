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
    first_name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        default: null,
        require: true
    },
    age: {
        type: Number,
        require:true
    },
    password: {
        type: String,
        //unique:true
        require: true
    },
    cart:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"carts"
    },
    role: {
        type: String,
        enum: ["ADMIN", "USER"],
        default: "USER"
    }
});

const userModel = mongoose.model(usersCollection, userSchema);

module.exports = userModel;