const express = require("express");
const router = require("../routers/Router");
const app = express();

const PORT = 8080;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Router
router(app);


app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});

