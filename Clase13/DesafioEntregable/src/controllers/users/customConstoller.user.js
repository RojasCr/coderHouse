const customRouter = require("../../routers/CustomRouter");
//const UserManager = require("../../dao/mongoManager/MongoUserManager");
//const { compareCrypt } = require("../../utils/cryptPassword");
//const jwt = require("jsonwebtoken")
const passport = require("passport");

//const userManager = new UserManager();

class UsersRouter extends customRouter{
    init(){
        this.post("/", passport.authenticate("register", {failureRedirect: "/failRegister"}),async(req, res) => {
            try {
                console.log("Registred")
                res.json({message: "Usuario registrado"});
            } catch (error) {
                console.log(error)
                res.json({message: "El usuario ya existe"})
            }
        });
        
        this.get("/failRegister", ["PUBLIC"],async(req, res) => {
            console.log("Falló la estrategia");
            res.send({error: "Falló"});
        })
    }
}

module.exports = UsersRouter;