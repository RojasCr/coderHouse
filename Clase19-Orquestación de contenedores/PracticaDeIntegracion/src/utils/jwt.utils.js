const jwt = require("jsonwebtoken");
const UserManager = require("../dao/mongoManager/MongoUserDao");
const { compareCrypt } = require("./cryptPassword");

const userManager = new UserManager();

const generateToken = async(email, password) => {
    try {
    
        if(email == "admin@admin" && password == "coder1"){
            const token = jwt.sign({email, role: "ADMIN"}, "secreto");
            const userInfo = {
                first_name: "Admin",
                role: "ADMIN"
            }
            //console.log(token)
            return {token, userInfo};
        }

        const user = await userManager.findUser(email);
        
        if(!user){
            return res.json({message: "Usuario y/o contraseña incorrecta"})
        }

        const isValidPassword = compareCrypt(password, user.password);
        
        if(!isValidPassword){
            return res.json({message: "Usuario y/o contraseña incorrecta"})
        }

        const userInfo = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            age: user.age,
            role:user.role
        }

       
        
        const token = jwt.sign({email, role: user.role}, "secreto");

        //req.headers.autentication = token;
        
        return {token, userInfo};
        
    }catch(error){
        //console.log(error);
        res.send(`Error: ${error}`)
    }
};

module.exports = {generateToken};