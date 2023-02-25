const { Router } = require("express");
const { io } = require("../server/socketServer")
const productsModel = require("../dao/models/products.model");
const messagesModel = require("../dao/models/messages.model");
const MongoProductManager = require("../dao/mongoManager/MongoProductManager");
const MongoCartManager = require("../dao/mongoManager/MongoCartManager");
const productManager = new MongoProductManager();
const cartManager = new MongoCartManager();
const manejadorDeProductos = require("../dao/filesManager/productManager");

const router = Router();


router.get("/", async(req, res) => {
    try{
        const products = await productsModel.find();

        const productsStr = JSON.stringify(products);
        const productsObj = JSON.parse(productsStr);
        res.render("home", { products: productsObj});

    } catch(err){
        throw new Error(err);
    }
});

router.get("/products", async(req, res) => {
    let { limit, page, sort, query } = req.query;
    // let products = await manejadorDeProductos.getProducts();
    // if(!limit){
    //     return res.json(products);
    // }
    // let productsLimit = await products.slice(0, limit);
    // res.json(productsLimit);
    let response = await productManager.getProducts(limit, page, sort, query);
    const orden = sort? `&sort=${sort}` : "";
    const filter = query? `&query=${query}` : "";
    
    const products = {
        status: response ? "succes" : "error",
        payload: response.docs,
        totalPages: response.totalPages,
        prevPage: response.prevPage,
        nextPage: response.nextPage,
        page: response.page,
        hasPrevPage: response.hasPrevPage,
        hasNextPage: response.hasNextPage,
        prevLink: response.hasPrevPage? `localhost:8080/products?limit=${limit||10}&page=${Number(response.page) - 1}${orden + filter}` : null,
        nextLink: response.hasNextPage? `localhost:8080/products?limit=${limit||10}&page=${Number(response.page) + 1}${orden + filter}` : null
    }

    const productsStr = JSON.stringify(products);
    const productsObj = JSON.parse(productsStr);
    return res.render("products", {products: productsObj, style: "css/productos.css"});
});

router.get("/products/description", async(req, res) => {
    const { pid } = req.query;
    const product = await productManager.getProductbyId(pid);
    const productStr = JSON.stringify(product);
    const productObj = JSON.parse(productStr);

    res.render("productDescription", {product: productObj})
});

router.get("/carts/:cid", async(req, res) => {
    const { cid } = req.params;
    const cartId = await cartManager.getCartById(cid);
    const cartStr = JSON.stringify(cartId);
    const cartObj = JSON.parse(cartStr);

    res.render("cart", {cart: cartObj})
});

router.get("/realTimesProducts", (req, res) => {
        res.render("realTimesProducts", {});
});

router.get("/chat", (req, res) => {
    res.render("chat", {style: "css/index.css"});
})

//Local
const clientes = [];
const messages = [];

//DataBase


io.on("connect", async (socket) => {

    clientes.push(socket);

    clientes.forEach( cliente => {
        cliente.id = clientes.indexOf(cliente) + 1;
    })
    console.log(`Cliente ${socket.id} conectado`);
    

    //RealTimesProducts
    const products = await manejadorDeProductos.getProducts();
    socket.emit("productos", products);

    router.post("/realTimesProducts/api/products", async (req, res) => {
            const { title, description, price, thumbail, code, stock, category} = req.body;
            const product = [
                title,
                description,
                price, 
                thumbail,
                code,
                stock,
                category
            ]
            const added = await manejadorDeProductos.addProduct(...product);
            const products = await manejadorDeProductos.getProducts();
            if(added === false){
                return `producto no agregado`;
            }
            io.emit("post", products[products.length-1]);
    });
        
    router.delete("/realTimesProducts/api/products/:pid", async(req, res) => {
            const { pid } = req.params;
            const deleted = await manejadorDeProductos.deleteProduct(pid);
            if(deleted === false){
                return `product not found`
            }
            const products = await manejadorDeProductos.getProducts();
            io.emit("productos", products);
    });
    //

    //Chat
    socket.emit("mensajeGrupal", messages);

    socket.on("message", async (data1, data2) => {
        //console.log(data);
        const newMessage = {
            user: data1,
            message: data2
        }
        let message = `User ${data1}: ${data2}`
        messages.push(message);
        await messagesModel.create(newMessage);
        io.emit("mensajeGrupal", messages);
    });
    socket.on("enviarArchivo", async (data1, data2) => {
        //console.log(data1);
        //console.log(data2);
        const newMessage = {
            user: data1,
            message: data2
        }
        let message = `User ${data1}: <img src=${data2} style = "width: 10rem; heigth: 20rem;">`
        messages.push(message);
        await messagesModel.create(newMessage);
        io.emit("archivoRecibido", messages);
    });



    socket.on("disconnect", () => {
        console.log(`Cliente ${socket.id} desconectado`);
    });
});




module.exports = router;