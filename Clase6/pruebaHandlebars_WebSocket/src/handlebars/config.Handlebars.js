//const { application } = require("express");
const handlebars = require("express-handlebars");
//const __dirname = require("../utils.js");

const handlebarsConfig = (app) => {
    app.engine("handlebars", handlebars.engine());
    app.set("views", __dirname+"/../views");
    app.set("view engine", "handlebars");
}

module.exports = handlebarsConfig;