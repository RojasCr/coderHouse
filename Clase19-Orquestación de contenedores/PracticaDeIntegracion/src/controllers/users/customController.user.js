const customRouter = require("../../routers/CustomRouter");

const passport = require("passport");


const Users = require("../../repositories/index")

class UsersRouter extends customRouter{
    init(){
        this.post("/", ["PUBLIC"], passport.authenticate("register", {failureRedirect: "/failRegister"}),async(req, res) => {
            try {
                req.logger.info("Nuevo usuario registrado")
                res.sendSuccess("Usuario registrado");
            } catch (error) {
                //console.log(error)
                //res.sendServerError({message: "El usuario ya existe"})
            }
        });
        
        this.get("/failRegister", ["PUBLIC"],async(req, res) => {
            //req.logger.error("Usuario ya existente")
            //console.log("Falló la estrategia");
            res.sendServerError(error);
        });

        this.get("/user", ["PUBLIC"], async(req, res) => {
            try {
                const {email}= req.query;
                const user = await Users.findUser(email);
                res.sendSuccess(user);
            } catch (error) {
                throw new Error(error);
            }
        })
        
        this.get("/all", ["PUBLIC"], async (req, res) => {
            try {
                
                const users = await Users.findAll();
                res.sendSuccess(users);
            } catch (error) {
                throw error
            }
        })
    }
}

module.exports = UsersRouter;