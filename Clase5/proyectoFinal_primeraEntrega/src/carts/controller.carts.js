const { Router } = require("express");

const router = Router();

router.get("/api/carts", (req, res) => {
    res.json({ message: "Funciona con carts!!"});
});

module.exports = router;