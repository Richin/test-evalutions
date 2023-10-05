
const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    firstName:String,
    lastName:String,
    userName:String,
    password:String,
    email:String,
    phoneNumber:String,
    role:String,
    company:String,
    joiningDate:String,
    employeeID:String,
    createdDate:String
})

const User = mongoose.model("user",userSchema)

module.exports = User