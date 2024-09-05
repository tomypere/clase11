import { Router } from "express";
import productsRouters from "./productsRoutes.js"
import cartsRouters from "./cartsRoutes.js"
import sessionRouters from "./session.routes.js"
import { isLogin } from "../middlewares/isLogin.middleware.js"

const router = Router()


router.use("/products", isLogin, productsRouters)
router.use("/carts", cartsRouters)
router.use("/session", sessionRouters)




export default router;