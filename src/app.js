import express from "express";
import router from "../routes/index.js"
import { connectMongoDB  } from "../config/mongoDb.config.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport"
import initializePassport from "../config/passport.config.js";
import cookieParser from "cookie-parser";

connectMongoDB();

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser("secret"))
app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://admin:tomastauscher@e-commerce.pgblped.mongodb.net/ecommerce",
        ttl: 15
    }),
    secret: "CodigoSecreto",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
initializePassport()

app.use("/api", router)



app.listen(8082, () => {
    console.log("Escuchando el servidor en el puerto 8082")
})