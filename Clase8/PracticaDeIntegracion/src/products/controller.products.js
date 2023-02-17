const { Router } = require("express");
const manejadorDeProductos = require("../dao/filesManager/productManager");
const productsModel = require("../dao/models/products.model");
const MongoProductManager = require("../dao/mongoManager/MongoProductManager");
const productManager = new MongoProductManager();

const router = Router();

router.get("/", async (req, res) =>{
    // let { limit } = req.query;
    // let products = await manejadorDeProductos.getProducts();
    // if(!limit){
    //     return res.json(products);
    // }
    // let productsLimit = await products.slice(0, limit);
    // res.json(productsLimit);
    productManager.getProducts(req, res);
});

router.get("/:pid", async (req, res) => {
    // let { pid } = req.params;
    // let products = await manejadorDeProductos.getProducts();
    // let productPid = await manejadorDeProductos.getProductById(pid);
    // if(pid > products.length){
    //     return res.json({ message: "ERROR: This product doesn't exist"});
    // }
    // res.json(productPid);
    productManager.getProductbyId(req, res);
});

router.post("/", async (req, res) => {
    // try{

    //     const { title, description, price, thumbail, code, stock, category} = req.body;
    //     const product = {
    //         title,
    //         description,
    //         price, 
    //         thumbail,
    //         code,
    //         stock,
    //         category
    //     }
    //     //const added = await manejadorDeProductos.addProduct(...product);
    //     const added = await productsModel.create(product);
    //     //const products = await manejadorDeProductos.getProducts();
    //     res.send(`Producto agregado`);
        
    // } catch(err){
    //     throw new Error(err);
    // }
    productManager.addProduct(req, res);
});

router.post("/loadProducts", async (req, res) => {
    try{
        await productsModel.deleteMany();
        const products = await manejadorDeProductos.getProducts();
        await productsModel.insertMany(products);
        res.send("Productos agregados a DB");
    } catch (err) {
        throw new Error(err);
    }
});

router.put("/:pid", async (req, res) => {
    // const { pid } = req.params;
    // const { title, description, price, thumbail, code, stock, category} = req.body;
    // const product = [
    //     id= pid,
    //     title,
    //     description,
    //     price, 
    //     thumbail,
    //     code,
    //     stock,
    //     category
    // ];
    // await manejadorDeProductos.updateProduct(...product);
    productManager.updateProduct(req, res);
});

router.delete("/:pid", async(req, res) => {
    // const { pid } = req.params;
    // await manejadorDeProductos.deleteProduct(pid);
    productManager.deleteProduct(req, res);
});

module.exports = router;