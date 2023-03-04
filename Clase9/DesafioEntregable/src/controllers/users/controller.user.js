const { Router } = require("express");
const UserManager = require("../../dao/mongoManager/MongoUserManager");
//const MongoUserManager = require(process.cwd()+`/src/dao/mongoManager/MongoUserManager.js`);

const router = Router();
const userManager = new UserManager();

router.post("/", async(req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;
        const newUser = {
            first_name,
            last_name,
            email,
            age,
            password
        }
    
        const response = await userManager.createUser(newUser);
    
        res.json({message: response})
    } catch (error) {
        //throw new Error(error)
         console.log(error)
        // res.json({error: err.errmsg})
        // if(error.code == 11000){
        //     res.status(400).send("El ususario ya existe")
        // }
        res.json({message: "El usuario ya existe"})
    }
})

module.exports = router;