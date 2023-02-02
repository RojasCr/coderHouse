const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const router = require("../routers/Router");
const handlebarsConfig = require("../handlebars/config.handlebars");

//const router = require("../routers/Router");
//const handlebarsConfig = require("../handlebars/config.handlebars")

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/../public"));

// //Router
//router(app);
//handlebarsConfig(app);

//io.on("connection", (socket) => {
    router;
    //console.log("hola");
    //io.emit("productos", [{l:1}])
//})

module.exports = { server, io, app };