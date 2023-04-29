
const cookieParser = require("cookie-parser");
const express = require("express");
const session = require("express-session");
const app = express();
const http = require("http");
const passport = require("passport");
const server = http.createServer(app);
const { Server } = require("socket.io");
const initializePassport = require("../config/passport.config");
const io = new Server(server);
const router = require("../routers/Router");
const mongoSessions = require("../db/sessions");
const errorHandler = require("../middlewares/errors");





//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/../public"));
app.use(cookieParser());


app.use(session(mongoSessions()))

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//Se ejecuta router(app)
router;


module.exports = { server, io, app };