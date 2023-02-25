const express = require("express");
const app = express();
const http = require("http");
const { default: mongoose } = require("mongoose");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const router = require("../routers/Router");

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/../public"));

//Se ejecuta router(app)
router;

mongoose.set("strictQuery", false);

mongoose.connect("mongodb+srv://coderBackend:descartes1@cluster0.9dxtyf1.mongodb.net/?retryWrites=true&w=majority", (err) => {
    if(err) {
        console.log("Cannot connect to DB: Error " + err);
    } else {
        console.log("DB connected");
    }
})



module.exports = { server, io, app };