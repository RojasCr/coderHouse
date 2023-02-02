const { Router } = require("express");
const manejadorDeCarrito = require("./cartsManager");

const router = Router();

router.post("/", async(req, res) => {
    const r = await manejadorDeCarrito.addCart();
    res.json({ message: r});
});

router.get("/:cid", async(req, res) => {
    const { cid } = req.params;
    const cart = await manejadorDeCarrito.getCartById(cid);
    res.json(cart);
});

router.post("/:cid/product/:pid", async(req, res) => {
    const { cid, pid} = req.params;
    const r = await manejadorDeCarrito.addProductToCart(cid, pid);
    res.json({ message: r});
});

module.exports = router;