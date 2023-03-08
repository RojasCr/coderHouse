const passport = require("passport");
const local = require("passport-local");
const google = require("passport-google-oauth20");
const github = require("passport-github2");

const { cryptPassword, compareCrypt } = require("../utils/cryptPassword");
const { clientIDGoogle, clientSecretGoogle } = require("./google.config");
const { clientIDGithub, clientSecretGithub } = require("./github.config");

const UserManager = require("../dao/mongoManager/MongoUserManager");
const userModel = require("../dao/models/users.model");
const userManager = new UserManager();

const LocalStrategy = local.Strategy;
const GoogleStrategy = google.Strategy;
const GithubStrategy = github.Strategy;

const initializePassport = () => {

    passport.use(new GoogleStrategy({
        clientID: clientIDGoogle,
        clientSecret: clientSecretGoogle,
        callbackURL: "http://localhost:8080/auth/google/callback"
    },
    async function(accesToken, refreshToken, profile, done){
        try {
            //console.log(profile)
            const user = await userModel.findOne({googleId: profile.id})
            
            if(!user){
                const newUser = {
                    googleId: profile.id,
                    first_name: profile._json.given_name,
                    last_name: profile._json.family_name,
                    //email: profile._json.email,
                    age: 25,
                    password: ""
                }

                const result = await userManager.createUser(newUser);
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
            console.log(profile)
            const user = await userModel.findOne({githubId: profile.id})
            
            if(!user){
                const newUser = {
                    githubId: profile.id,
                    first_name: profile._json.name,
                    last_name: profile._json.family_name,
                    email: profile._json.email,
                    age: 25,
                    password: ""
                }

                const result = await userManager.createUser(newUser);
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
            const { first_name, last_name, email, age } = req.body;
            try{
                const user = await userManager.findUser(username);
                if(user){
                    console.log("Usuario ya existe");
                    return done(null, false);
                }
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: cryptPassword(password)
                }
                
                const result = await userManager.createUser(newUser);
                return done(null, result);
            } catch(error){
                return done(`Error al obtener el usuario: ${error}`);
            }
        }
    ))

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async(id, done) => {
        const user = await userManager.findById(id);
        done(null, user);
    })

    passport.use("login", new LocalStrategy({usernameField: "email"}, async(username, password, done) => {
        try {
            
            const user = await userManager.findUser(username);
            if(!user){
                console.log("Usuario no encontrado");
                return done(null, false);
            }

            if(!compareCrypt(password, user.password)){
                return done(null, false);
            }


            return done(null, user)
        } catch (error) {
            return done(error)
        }
    }))
}


module.exports = initializePassport;