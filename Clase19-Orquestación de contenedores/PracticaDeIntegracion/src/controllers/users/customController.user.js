const customRouter = require("../../routers/CustomRouter");

const passport = require("passport");


const Users = require("../../repositories/index");
const userModel = require("../../dao/mongo/models/users.model");

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

        this.patch("/premium", ["USER", "PREMIUM"], async(req, res) => {
            try {
                const currentUser = req.user;
                
                // let newGrade = currentUser.role === "USER"? "PREMIUM" : "USER";

                if(currentUser.role === "USER"){
                    const response = await userModel.findOneAndUpdate({email: currentUser.email}, {role: "PREMIUM"})
                    console.log(response.role)
                    return res.sendSuccess(`Ahora eres ${response.role}`);
                }

                if(currentUser.role === "PREMIUM"){
                    const response = await userModel.findOneAndUpdate({email: currentUser.email}, {role: "USER"})
                    console.log(response.role)
                    return res.sendSuccess(`Ahora eres ${response.role}`);
                }
                
                // switch (currentUser.role) {
                //     case "USER":
                //         let newGrade = "PREMIUM"
                //     break;
                //     case "PREMIUM":
                //         newGrade = "USER"
                //     break;        
                //     default:
                //     break;
                // }
                            
                //const response = await Users.updateGrade(currentUser.email, currentUser.role)
            } catch (error) {
                req.logger.error(error.cause)
                res.sendServerError(error)
            }
        })

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