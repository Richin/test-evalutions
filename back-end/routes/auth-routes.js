const {Router} = require("express")
const {signup, login} = require("../route-handler/auth-route-handler")
const {authenticator} = require("../middileware/authenticator")

const authRouter = Router()

authRouter.post("/signup", signup)
authRouter.post("/login", authenticator, login)

module.exports = authRouter