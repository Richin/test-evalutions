const User = require("../models/user-model");

module.exports.signup = async (req, res) => {
  const {
    firstName,
    lastName,
    userName,
    password,
    email,
    joiningDate,
    role,
    company,
    phoneNumber,
    employeeID,
    createdDate
  } = req.body;

  const findResponse = await User.findOne({ userName });
  if (!findResponse) {
    const user = new User({
      firstName,
      lastName,
      userName,
      password,
      email,
      joiningDate,
      role,
      company,
      phoneNumber,
      employeeID,
      createdDate
    });

    const response = await user.save();
    console.log(response);
  }else{
    console.log("user is allready exist")
  }
};

module.exports.login = (req, res) =>{
    if(req.user){
        res.status(200).json({
            message:"successfull logged",
            statue:"completet",
            profile:req.user
        })
    }
    
}
