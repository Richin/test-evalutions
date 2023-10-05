const {Router} = require("express")
const {fetchEmployees, deleteEmployee, fetchEmployee, updateemployee} = require("../route-handler/user-route-handlers")
 
const userRouter = Router()

userRouter.get("/fetchemployees",fetchEmployees)

userRouter.delete("/deleteemployee",deleteEmployee)

userRouter.get("/fetchemployee",fetchEmployee)

userRouter.post("/updateemployee",updateemployee)

module.exports = userRouter