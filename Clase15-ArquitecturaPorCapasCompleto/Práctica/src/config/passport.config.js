const passport = require("passport");
const local = require("passport-local");
const google = require("passport-google-oauth20");
const github = require("passport-github2");
const jwtPassport = require("passport-jwt");

const CartManager = require("../dao/mongoManager/MongoCartManager");
const cartManager = new CartManager();

//const UserDao = require("../dao/factory")
//const Users = new UserDao()

const Users = require("../repositories/index")
const UserDTO = require("../DTOs/User.dto");


//const UserManager = require("../dao/mongoManager/MongoUserDao");
//const userManager = new UserManager();
const userModel = require("../dao/mongo/models/users.model");

const jwt = require("jsonwebtoken")

const { cryptPassword, compareCrypt } = require("../utils/cryptPassword");
const { clientIDGoogle, clientSecretGoogle } = require("./google.config");
const { clientIDGithub, clientSecretGithub } = require("./github.config");

const cookieExtractor = require("../utils/cookieExtractorJwt");

const userError = require("../utils/errors/user/user.error");

const LocalStrategy = local.Strategy;
const GoogleStrategy = google.Strategy;
const GithubStrategy = github.Strategy;

const JwtStrategy = jwtPassport.Strategy;
const ExtractJwt = jwtPassport.ExtractJwt;

const initializePassport = () => {

    passport.use(new GoogleStrategy({
        clientID: clientIDGoogle,
        clientSecret: clientSecretGoogle,
        callbackURL: "http://localhost:8080/auth/google/callback",
        
    },
    async function(accesToken, refreshToken, profile, done){
        try {
            //console.log(profile)
            const user = await userModel.findOne({googleId: profile.id})
            const cart = await cartManager.addCart();

            if(!user){
                const newUserInfo = {
                    googleId: profile.id,
                    first_name: profile._json.given_name,
                    last_name: profile._json.family_name,
                    email: profile._json.email,
                    age: profile._json.age,
                    cart: cart.result._id,
                    //password: ""
                }

                //const newUser = new UserDTO(newUserInfo)

                const result = await Users.createUser(newUserInfo);
                return done(null, result);
            }

            return done(null, user);
        } catch (error) {
            done(error);
        }
    }
    ))

    passport.use(new GithubStrategy({
        clientID: clientIDGithub,
        clientSecret: clientSecretGithub,
        callbackURL: "http://localhost:8080/auth/github/callback"
    },
    async function(accesToken, refreshToken, profile, done){
        try {
            //console.log(profile)
            const user = await userModel.findOne({githubId: profile.id});
            const cart = await cartManager.addCart();
            
            if(!user){
                const newUserInfo = {
                    githubId: profile.id,
                    first_name: profile._json.name,
                    last_name: profile._json.family_name,
                    email: profile._json.email,
                    age: profile._json.age,
                    cart: cart.result._id,
                    //password: ""
                }

                //const newUser = new UserDTO(newUserInfo)

                const result = await Users.createUser(newUserInfo);
                return done(null, result);
            }

            return done(null, user);
        } catch (error) {
            done(error);
        }
    }
    ))

    passport.use("register", new LocalStrategy(
        {passReqToCallback: true, usernameField:"email"}, async (req, username, password, done) => {
            
            try{
                const userInfo = req.body;

                if(!userInfo.first_name || !userInfo.last_name || !userInfo.email || !userInfo.age){
                    userError(userInfo);
                }

                const user = await Users.findUser(username);
                
                if(user){
                    console.log("Usuario ya existe");
                    return done(null, false);
                }
                
                const newCart = await cartManager.addCart();

                userInfo.cart = newCart.result._id
                const newUser = new UserDTO(userInfo);
                
                //console.log(newUser)
                
                const result = await Users.createUser(newUser);
                
                return done(null, result);
            } catch(error){
                return done(error);
            }
        }
    ));

    const optionsJwt = {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        //jwtFromRequest: ExtractJwt.fromHeader("autentication"),
        secretOrKey: "secreto",
    }

    passport.use("jwt", new JwtStrategy(optionsJwt,
        (jwt_payload, done) => {
            try {
                return done(null, jwt_payload)
            } catch (error) {
                return done(error)
            }
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async(id, done) => {
        const user = await Users.findById(id);
        done(null, user);
    })

    passport.use("login", new LocalStrategy({usernameField: "email"}, async(username, password, done) => {
        try {
            
            const user = await Users.findUser(username);
            if(!user){
                console.log("Usuario no encontrado");
                return done(null, false);
            }

            if(!compareCrypt(password, user.password)){
                return done(null, false);
            }

            //let token = jwt.sign({email: user.email, role: user.role}, "secreto");
            //console.log(token)
            //user.token=token;

            return done(null, user)
        } catch (error) {
            return done(error)
        }
    }))
}


module.exports = initializePassport;