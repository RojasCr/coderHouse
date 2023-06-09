const customRouter = require("../../routers/CustomRouter");
const jwt = require("jsonwebtoken")
const passport = require("passport");
const fs = require("fs");


const Users = require("../../repositories/index");
const userModel = require("../../dao/mongo/models/users.model");
const uploader = require("../../utils/multer.utils");


class UsersRouter extends customRouter{
    init(){
        this.post("/", ["PUBLIC"], passport.authenticate("register", {failureRedirect: "/failRegister"}),async(req, res) => {
            try {
                req.logger.info("Nuevo usuario registrado")
                res.sendSuccess("Usuario registrado");
            } catch (error) {
                console.log(error)
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
                const currentRole = currentUser.role;

                if(currentRole === "USER"){

                    const path = `${process.cwd()}/src/files/documents/${currentUser.email}`
                    /*const documentsPaths = {
                        documento: `${path}/documento.${"jpg" || "png" || "pdf"}`,
                        comprobanteDomicilio: `${path}/comprobanteDomicilio.${"jpg" || "png" || "pdf"}`,
                        comprobanteCuenta: `${path}/comprobanteCuenta.${"jpg" || "png" || "pdf"}`,
                    }*/

                    //console.log(documentsPaths)
    
                    if(!fs.existsSync(path)){
                        return res.sendUserError("No has completado la documentación")
                    }
                }
                
                /*switch (currentUser.role) {
                    case "USER":
                        currentUser.role = "PREMIUM"
                    break;
                    case "PREMIUM":
                        currentUser.role = "USER"
                    break;        
                    default:
                    break;
                }*/

                const rolesChanger = {
                    USER: "PREMIUM",
                    PREMIUM: "USER"
                }

                const newRole = rolesChanger[currentRole];
                            
                const response = await Users.updateGrade(currentUser.email, newRole);
                const newJwt = jwt.sign({email: currentUser.email, role: newRole}, "secreto");
                return res.cookie("jwt", newJwt).sendSuccess(`Ahora eres ${newRole}`);
            
            } catch (error) {
                req.logger.error(error)
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

        this.post("/documents", ["USER","ADMIN", "PREMIUM"], uploader.any(),async (req, res) => {
            try {
                const currentUser = req.user;

                if(currentUser.role === "PREMIUM"){
                    return res.sendSuccess("Ya eres Premium")
                }
                const files = req.files;
               
                res.sendSuccess(`Tus archivos ${files[0].filename}, ${files[1].filename} y ${files[2].filename} se cargaron correctamente`)
            } catch (error) {
                //console.log(error)
                throw new Error(error)
            }
        })
    }
}

module.exports = UsersRouter;