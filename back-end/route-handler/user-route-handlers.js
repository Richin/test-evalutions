const User = require("../models/user-model");

module.exports.fetchEmployees = async (req, res) => {
  const employees = await User.find(
    {},
    {
      _id: true,
      firstName: true,
      lastName: true,
      email: true,
      company: true,
      joiningDate: true,
      role: true,
      createdDate: true,
    }
  );

  res.status(200).json({
    message: "suuccessfully fetched",
    status: "completed",
    employees,
  });
};

module.exports.deleteEmployee = async (req, res) => {
  const { id } = req.query;
  const response = await User.deleteOne({ _id: id });
  if (response.acknowledged) {
    res.status(200).json({
      message: "successfully deleted",
      status: "completed",
      acknowledged: true,
    });
  } else {
    res.status(400).json({
      message: "cannot delete item",
      status: "failed",
      acknowledged: false,
    });
  }
};

module.exports.fetchEmployee = async (req, res) => {
  const { id } = req.query;

  const employeeData = await User.findOne(
    { _id: id },
    {
      firstName: true,
      lastName: true,
      company: true,
      userName: true,
      role: true,
      joiningDate: true,
      password: true,
      employeeID: true,
      phoneNumber: true,
      email: true,
    }
  );

  if (employeeData) {
    res.status(200).json({
      message: "detalis successfully fetched",
      status: "completed",
      employeeData,
    });
  } else {
    res.status(400).json({
      message: "cannot fetch details",
      status: "failed",
    });
  }
};

module.exports.updateemployee = async (req, res) => {
  console.log(req.body);
  const { id, employeeData } = req.body;
  const {
    firstName,
    lastName,
    company,
    userName,
    role,
    joiningDate,
    password,
    employeeID,
    phoneNumber,
    createdDate,
    email,
  } = employeeData;
  const response = await User.replaceOne(
    { _id: id },
    {
      firstName,
      lastName,
      company,
      userName,
      role,
      joiningDate,
      password,
      employeeID,
      phoneNumber,
      createdDate,
      email,
    }
  );
  
  if(response){
    res.status(200).json({
      message:"successfully updated",
      status:"completed"
    })
  }
};
