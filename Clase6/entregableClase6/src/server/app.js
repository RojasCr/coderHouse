//const express = require("express");
const router = require("../routers/Router");
//const app = express();
const handlebarsConfig = require("../handlebars/config.handlebars");
//const { Server } = require("socket.io");
//const manejadorDeProductos = require("../products/productManager");
const { server, app }= require("./socketServer");

const PORT = 8080;

// //Middlewares
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));
// app.use(express.static(__dirname + "/../public"));

//Router
router(app);
handlebarsConfig(app);

server.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});

//const socketServer = new Server(httpServer);

//socketServer.on("connection", async(socket) => {
    //console.log("nuevo");
    
    //const products = await manejadorDeProductos.getProducts();

   

    //socketServer.emit("productos", products)
    // const products = await manejadorDeProductos.getProducts();
    // socket.emit("productos", products);
    
    //router(app);
    // app.get("/realTimesProducts", async(req, res) => {
    //     //const mess = "hola";
    //     res.render("realTimesProducts", {});
    //     const products = await manejadorDeProductos.getProducts();
    //     //res.send("hola")
    //     socket.emit("productos", products);
    // });    
    
    // app.post("/api/products", async (req, res) => {
    //     const { title, description, price, thumbail, code, stock, category} = req.body;
    //     const product = [
    //         title,
    //         description,
    //         price, 
    //         thumbail,
    //         code,
    //         stock,
    //         category
    //     ]
    //     const added = await manejadorDeProductos.addProduct(...product);
    //     const products = await manejadorDeProductos.getProducts();
    //     if(added === false){
    //         return `producto no agregado`;
    //     }
    //     socketServer.emit("post", products[products.length-1]);
    // });
//});




//module.exports = socketServer;