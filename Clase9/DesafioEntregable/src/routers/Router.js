const productsController = require("../products/controller.products");
const cartsController = require("../carts/controller.carts");
const handlebarsController = require("../handlebars/controller.handlebars")
const sessionController = require("../controllers/sessions/session.controller");
const userController = require("../controllers/users/controller.user")
const authController = require("../auth/auth")

const router = (app) => {
    //Middlewares
    app.use("/api/products", productsController);
    app.use("/api/carts", cartsController);
    app.use("/api/sessions", sessionController)
    app.use("/", handlebarsController);

    app.use("/users", userController)
    app.use("/auth", authController)
}

module.exports = router;