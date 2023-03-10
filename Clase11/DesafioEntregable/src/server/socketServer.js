const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");
const express = require("express");
const session = require("express-session");
const app = express();
const http = require("http");
const { default: mongoose } = require("mongoose");
const passport = require("passport");
const server = http.createServer(app);
const { Server } = require("socket.io");
const initializePassport = require("../config/passport.config");
const io = new Server(server);
const router = require("../routers/Router");

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/../public"));
app.use(cookieParser());

app.use(session({
    store: MongoStore.create({
        mongoUrl:"mongodb+srv://coderBackend:descartes1@cluster0.9dxtyf1.mongodb.net/sessions?retryWrites=true&w=majority",
        mongoOptions:{useNewUrlParser: true},
        
    }),
    secret: "fabi",
    resave: false,
    saveUninitialized: false
}))

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

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