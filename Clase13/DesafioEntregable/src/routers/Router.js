const productsController = require("../controllers/products/controller.products");
const cartsController = require("../controllers/carts/controller.carts");
//const handlebarsController = require("../handlebars/controller.handlebars")
const userController = require("../controllers/users/controller.user")
//const authController = require("../auth/auth")

const CustomControllerUsers = require("../controllers/users/customConstoller.user")
const customUsersController = new CustomControllerUsers();

const CustomControllerAuth = require("../auth/customController.auth")
const customAuthController = new CustomControllerAuth();

const CustomControllerHandlebars = require("../handlebars/customController.handlebars");
const customHandlebarsCOntroller = new CustomControllerHandlebars();

const router = (app) => {
    //Middlewares
    app.use("/api/products", productsController);
    app.use("/api/carts", cartsController);
    //app.use("/", handlebarsController);

    //app.use("/users", userController)
    //app.use("/auth", authController)

    app.use("/auth", customAuthController.getRouter());
    app.use("/users", customUsersController.getRouter());
    app.use("/", customHandlebarsCOntroller.getRouter());
}

module.exports = router;