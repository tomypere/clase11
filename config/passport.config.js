import passport from "passport";
import local from "passport-local"
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import userDao from "../dao/mongoDao/user.dao.js";
import google from "passport-google-oauth20"

const localStrategy = local.Strategy
const GoogleStrategy = google.Strategy

const initializePassport = () => {
    passport.use( 
        "register",
        new localStrategy( {passReqToCallback: true, usernameField: "email" },
        async (req, username, password, done) => {
            try{

                const {first_name, last_name, email, age} = req.body
                const user = await userDao.getByEmail(username)
                if(user) return done(null, false, {message: "El usuario ya existe"})
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    password: createHash(password),
                    age,
                }


                const createUser = await userDao.create(newUser)
                return done(null, createUser)


            } catch (error) {
                return done(error)
            }
        }
        ) )

        passport.use(
            "login",
            new localStrategy({usernameField: "email" }, async (username, password, done) => {

                try{
                    const user = await userDao.getByEmail(username)
                    if(!user || !isValidPassword(user, password) ) return done(null, false, { message: "email o password invalidos"})
                    
                    return done(null, user)
                } catch (error) {
                    done(error)
                }

            })
        )

        passport.use(
            "google",
            new GoogleStrategy(
                {
                    clientID: "",
                    clientSecret: "",
                    callbackURL: "",
                },
                async (accessToken, refreshToken, profile, cb) => {
                    try{

                        const { name, emails} = profile
                        const user = {
                            first_name: name.givenName,
                            last_name: name.familyName,
                            email: emails[0].value
                        }

                        const existUser = await userDao.getByEmail(emails[0].value)
                        if(existUser) return cb(null, existUser)

                        const newUser = await userDao.create(user)
                        cb(null, newUser)
                    } catch (error) {
                        return cb(error)
                    }
                }
            )
        )

        passport.serializeUser( (user, done) => {
            done(null, user._id)
        } )
        passport.deserializeUser(async ( id, done ) => {
            const user = await userDao.getById(id)
            done(null, user)
        })

}

export default initializePassport