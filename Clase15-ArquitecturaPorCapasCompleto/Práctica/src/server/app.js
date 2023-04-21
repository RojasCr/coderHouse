const router = require("../routers/Router");
const handlebarsConfig = require("../handlebars/config.handlebars");
const { server, app }= require("./socketServer");
const { port } = require("../config/app.config");
//const mongoConnect = require("../db");

const PORT = port;

//Router
router(app);
handlebarsConfig(app);


server.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});