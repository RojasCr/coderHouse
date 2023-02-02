const { Router } = require("express");
const router = Router();

let food = [
    {name: "Papas", price: 1000},
    {name: "Milanesas", price: 2000}
]

router.get("/", (req, res) => {
    let user = {
        name: "Fabian",
        age: 29,
        role: "admin"
    }

    res.render("index", {
        user: user,
        isAdmin: user.role === "admin",
        food
    });
});

module.exports = router;