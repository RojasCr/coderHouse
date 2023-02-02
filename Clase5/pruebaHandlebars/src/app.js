const express = require("express");
const handlebarsConfig = require("./handlebars/config.Handlebars");
const router = require("./routes/Router");
const app = express();


const PORT = 8080;

app.use(express.static(__dirname + "/public"));

handlebarsConfig(app);
router(app);


app.listen(PORT, () => {
    console.log(`Server listening at port: ${PORT}`);
})
