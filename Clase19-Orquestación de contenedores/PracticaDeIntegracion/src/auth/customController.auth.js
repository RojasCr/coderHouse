const CustomRouter = require("../routers/CustomRouter");
const UserManager = require("../dao/mongoManager/MongoUserDao");
//const { compareCrypt } = require("../../utils/cryptPassword");
const jwt = require("jsonwebtoken")
const { generateToken } = require("../utils/jwt.utils");
const passport = require("passport");

const userManager = new UserManager();

class AuthRouter extends CustomRouter{
    init(){
    
        this.post("/", ["PUBLIC"],async(req, res) => {
            try {
                const {token,userInfo} = await generateToken(req, res)
                //console.log(token);    
                res.cookie("jwt", token).cookie("user", userInfo).redirect("/products");
            } catch (error) {
                //res.sendServerError(`Algo fue mal: ${error}`)
                req.logger.error("Usuario no autenticado")
            }
        })

        //GOOGLE
        this.get("/google", ["PUBLIC"],passport.authenticate("google", {scope: ["profile"]}))

        this.get("/google/callback", ["PUBLIC"],passport.authenticate("google", {failureRedirect: "/login"}), (req, res) => {
            req.user.role = "USER";
            //req.session.user = req.user;
            //console.log(req.user)
            res.cookie("jwt",jwt.sign({role: req.user.role}, "secreto")).cookie("user", req.user).redirect("/products")
        })

        //GITHUB
        this.get("/github", ["PUBLIC"],passport.authenticate("github", {scope: ["user: email"]}));

        this.get("/github/callback", ["PUBLIC"],passport.authenticate("github", {failureRedirect: "/login"}), (req, res) => {
            req.user.role = "USER";
            //req.session.user = req.user;
            res.cookie("jwt",jwt.sign({role: req.user.role}, "secreto")).cookie("user", req.user).redirect("/products");
        })

        this.get("/logout", ["PUBLIC"],(req, res) => {
            //console.log(req.session)
            req.session.destroy(err => {
                if(err){
                    res.json({msg: err})
                }
                //console.log(req.session)
                return res.clearCookie("jwt").clearCookie("user").redirect("/");
            })
    
        });

        this.patch("/restore", async (req, res) => {
            try {
                const { email, newPassword } = req.body;
                await userManager.updateUser(email, newPassword);
                return res.json({message: "Contraseña restaurada"});
            } catch (error) {
                console.log(error);
            }
        })
    }
}

module.exports = AuthRouter;