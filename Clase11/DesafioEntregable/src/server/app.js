const router = require("../routers/Router");
const handlebarsConfig = require("../handlebars/config.handlebars");
const { server, app }= require("./socketServer");

const PORT = 8080;

//Router
router(app);
handlebarsConfig(app);

server.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});