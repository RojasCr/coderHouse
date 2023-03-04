const { Router } = require("express");
const router = Router();
const UserManager = require("../dao/mongoManager/MongoUserManager")
const userManager = new UserManager();


router.post("/", async(req, res) => {
    try {
        const { user, password } = req.body
        const response = await userManager.findUser(user);       

        if(user === "adminCoder@coder.com" && password === "adminCod3r123"){
            req.session.user = {
                first_name: user,
                role : "admin"
            }
            return res.json({message: req.session.user});
        }

        // } else {
        //     req.session.user.role = "usuario";
        // }

        if(!response || response.password !== password){
            return res.json({message: `El ususario y/o contraseña son incorrectos`})
        }

        req.session.user = {
            first_name: response.first_name,
            last_name: response.last_name,
            email: response.email,
            age: response.age,
            role: "usuario"
        };

        
        res.json({message: req.session.user});
        
    } catch (error) {
        console.log(error)
    }
    
})

router.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if(err){
            res.json({msg: err})
        }
        res.redirect("/login");
    })
})

module.exports = router;