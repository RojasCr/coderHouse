const handlebarsController = require("../handlebars/controller.handlebars")

const router = (app) => {
    app.use("/", handlebarsController);
}

module.exports = router;