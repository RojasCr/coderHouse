const productsController = require("../controllers/products/controller.products");
const cartsController = require("../controllers/carts/controller.carts");
const handlebarsController = require("../handlebars/controller.handlebars")
const userController = require("../controllers/users/controller.user")
const authController = require("../auth/auth")

const router = (app) => {
    //Middlewares
    app.use("/api/products", productsController);
    app.use("/api/carts", cartsController);
    app.use("/", handlebarsController);

    app.use("/users", userController)
    app.use("/auth", authController)
}

module.exports = router;