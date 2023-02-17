const productsController = require("../products/controller.products");
const cartsController = require("../carts/controller.carts");
const handlebarsController = require("../handlebars/controller.handlebars")

const router = (app) => {
    //Middlewares
    app.use("/api/products", productsController);
    app.use("/api/carts", cartsController);
    app.use("/", handlebarsController);
    //app.use("/products", productsController)
}

module.exports = router;