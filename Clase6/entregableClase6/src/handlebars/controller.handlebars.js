const { Router } = require("express");
const router = Router();
const manejadorDeProductos = require("../products/productManager");
const { io } = require("../server/socketServer")



router.get("/", async(req, res) => {
    const products = await manejadorDeProductos.getProducts();
    res.render("home", { products: products});
});

router.get("/realTimesProducts", (req, res) => {
        res.render("realTimesProducts", {});
});

const clientes = [];

io.on("connect", async (socket) => {

    clientes.push(socket);

    clientes.forEach( cliente => {
        cliente.id = clientes.indexOf(cliente) + 1;
    })
    console.log(`Cliente ${socket.id} conectado`);
    
    const products = await manejadorDeProductos.getProducts();
    socket.emit("productos", products);

    router.post("/api/products", async (req, res) => {
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
        
    router.delete("/api/products/:pid", async(req, res) => {
            const { pid } = req.params;
            const deleted = await manejadorDeProductos.deleteProduct(pid);
            if(deleted === false){
                return `product not found`
            }
            const products = await manejadorDeProductos.getProducts();
            io.emit("productos", products);
    });

    socket.on("disconnect", () => {
        console.log(`Cliente ${socket.id} desconectado`);
    });
});




module.exports = router;