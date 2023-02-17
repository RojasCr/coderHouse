const { Router } = require("express");
//const manejadorDeCarrito = require("../dao/filesManager/cartsManager");
const MongoCartManager = require("../dao/mongoManager/MongoCartManager");
const cartManager = new MongoCartManager;

const router = Router();

router.post("/", async(req, res) => {
    //const response = await manejadorDeCarrito.addCart();
    
    // const newCart = {
    //     id: 3,
    //     products: []
    // }
    // const response = await cartsModel.create(newCart);
    // res.json({ message: response});
    cartManager.addCart(req, res);
});

router.get("/:cid", async(req, res) => {
    /*const { cid } = req.params;
    const cart = await manejadorDeCarrito.getCartById(cid);
    res.json(cart);*/
    cartManager.getCartById(req, res);
});

router.post("/:cid/product/:pid", async(req, res) => {
    cartManager.addProductToCart(req,res);
});

module.exports = router;