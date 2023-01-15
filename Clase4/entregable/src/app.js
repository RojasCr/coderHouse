const express = require("express");
const manejadorDeProductos= require("./productManager");
const app = express();
const PORT = 8080;

//Middlewares
app.use(express.urlencoded({extended: true}));

//Endpoints
app.get("/products", async (req, res) =>{
    let { limit } = req.query;
    let products = await manejadorDeProductos.getProducts();
    if(!limit){
        return res.json(products);
    }
    let productsLimit = await products.slice(0, limit);
    res.json(productsLimit);
    
});

app.get("/products/:pid", async (req, res) => {
    let { pid } = req.params;
    let products = await manejadorDeProductos.getProducts();
    let productPid = await manejadorDeProductos.getProductById(pid);
    if(pid > products.length){
        return res.json({ message: "ERROR: This product doesn't exist"});
    }
    res.json(productPid);
});



app.listen( PORT, () => {
    console.log(`Server listen on port ${PORT}`);
})