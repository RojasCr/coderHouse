const { Router } = require("express");
const passport = require("passport");
const router = Router();
const UserManager = require("../dao/mongoManager/MongoUserManager");
const {compareCrypt} = require("../utils/cryptPassword")
const userManager = new UserManager();


router.post("/", passport.authenticate("login", {failureRedirect: "/auth/failLogin"}),async(req, res) => {
    //***MODIFICAR*** */
    try {
        if(!req.user){
            return res.status(400).json({message: "Credenciales inválidas"})
        }

        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age
        }

        if(req.user.first_name === "adminCoder@coder.com"){
            req.session.user = {
                role: "admin"
            }
        } else {
            req.session.user.role = "usuario";
        }

        res.json({message: req.user})
    } catch (error) {
        console.log(error);
    }
    // try {
    //     const { user, password } = req.body
    //     const response = await userManager.findUser(user);       

    //     if(user === "adminCoder@coder.com" && password === "adminCod3r123"){
    //         req.session.user = {
    //             first_name: user,
    //             role : "admin"
    //         }
    //         return res.json({message: req.session.user});
    //     }

    //     // } else {
    //     //     req.session.user.role = "usuario";
    //     // }

    //     if(!response || /*response.password !== password*/ !compareCrypt(password, response.password)){
    //         return res.json({message: `El ususario y/o contraseña son incorrectos`})
    //     }

    //     req.session.user = {
    //         first_name: response.first_name,
    //         last_name: response.last_name,
    //         email: response.email,
    //         age: response.age,
    //         role: "usuario"
    //     };

        
    //     res.json({message: req.session.user});
        
    // } catch (error) {
    //     console.log(error)
    // }
    
})

router.get("/failLogin", (req, res) => {
    res.json({message: "Falló el login"});
})

//GOOGLE
router.get("/google", passport.authenticate("google", {scope: ["profile"]}))

router.get("/google/callback", passport.authenticate("google", {failureRedirect: "/login"}), (req, res) => {
    req.user.role = "usuario";
    req.session.user = req.user;
    //console.log(req.user)
    res.redirect("/")
})

//GITHUB
router.get("/github", passport.authenticate("github", {scope: ["user: email"]}));

router.get("/github/callback", passport.authenticate("github", {failureRedirect: "/login"}), (req, res) => {
    req.user.role = "usuario";
    req.session.user = req.user;
    res.redirect("/");
})

router.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if(err){
            res.json({msg: err})
        }
        res.redirect("/login");
    })
});

router.patch("/restore", async (req, res) => {
    try {
        const { email, newPassword } = req.body;
    
        await userManager.updateUser(email, newPassword);
        return res.json({message: "Contraseña restaurada"});
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;