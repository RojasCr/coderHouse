const { Router } = require("express");
const manejadorDeProductos = require("./productManager");

const router = Router();

router.get("/", async (req, res) =>{
    let { limit } = req.query;
    let products = await manejadorDeProductos.getProducts();
    if(!limit){
        return res.json(products);
    }
    let productsLimit = await products.slice(0, limit);
    res.json(productsLimit);
});

router.get("/:pid", async (req, res) => {
    let { pid } = req.params;
    let products = await manejadorDeProductos.getProducts();
    let productPid = await manejadorDeProductos.getProductById(pid);
    if(pid > products.length){
        return res.json({ message: "ERROR: This product doesn't exist"});
    }
    res.json(productPid);
});

router.post("/", async (req, res) => {
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
    await manejadorDeProductos.addProduct(...product);
});

router.put("/:pid", async (req, res) => {
    const { pid } = req.params;
    const { title, description, price, thumbail, code, stock, category} = req.body;
    const product = [
        id= pid,
        title,
        description,
        price, 
        thumbail,
        code,
        stock,
        category
    ];
    await manejadorDeProductos.updateProduct(...product);
});

router.delete("/:pid", async(req, res) => {
    const { pid } = req.params;
    await manejadorDeProductos.deleteProduct(pid);
});

module.exports = router;