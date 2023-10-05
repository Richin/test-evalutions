const User = require("../models/user-model")


module.exports.authenticator =async (req, res, next) =>{
    const {userName, password} = req.body

    let userFindResponse = await User.findOne({userName})
    if(!userFindResponse){
        userFindResponse = await User.findOne({email:userName})
        if(!userFindResponse){
           return res.status(400).json({
                message:"user does not exist",
                status:"login failed"
            })
        }
    }
    
    if(userFindResponse && userFindResponse.password === password){
        req.user = {
            userID:userFindResponse.id,
            role:userFindResponse.role
        }
       return next()
    }else{
        res.status(400).json({
            message:"incorrect username or password",
            status:"login failed"
        })
    }

}