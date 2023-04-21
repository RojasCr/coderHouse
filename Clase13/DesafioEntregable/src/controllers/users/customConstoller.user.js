const customRouter = require("../../routers/CustomRouter");
const UserManager = require("../../dao/mongoManager/MongoUserManager");
//const { compareCrypt } = require("../../utils/cryptPassword");
//const jwt = require("jsonwebtoken")
const passport = require("passport");
const userModel = require("../../dao/models/users.model");

const userManager = new UserManager();

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
        });

        this.get("/getUser", ["PUBLIC"],async(req, res) => {
            try {
                const {email}= req.body;
                const user = await userManager.findUser(email);
                res.json({message: user});
            } catch (error) {
                throw new Error(error);
            }
        })

        this.get("/getAll", ["PUBLIC"], async (req, res) => {
            try {
                const users = await userModel.find();
                res.json({message: users});
            } catch (error) {
                throw error
            }
        })
    }
}

module.exports = UsersRouter;