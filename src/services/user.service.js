// CRIO_SOLUTION_START_MODULE_UNDERSTANDING_BASICS
// CRIO_SOLUTION_END_MODULE_UNDERSTANDING_BASICS
const { User } = require("../models");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

//Getters Methods ------------------------------------
const getUserById = async (id) => {
  return User.findById(id);
};


const getUserByEmail = async (email) => {
  return User.findOne({ email });
};


const getUserByContact = async (contact) => {
  return User.findOne({contact});
}

const getUserAddressById = async (id) => {
  return User.findOne({ _id: id }, { email: 1, address: 1 });

};

//Setter Methods :--------------------------------------------
const createUser = async (userBody) => {
  if (await User.isContactTaken(userBody.contact)) {
    throw new ApiError(httpStatus.OK, "Account already exists with the same contact number.");
  }
  const user = await User.create(userBody);
  return user;
};


const setAddress = async (user, newAddress) => {
  user.address = newAddress;
  await user.save();
  return user.address;
};


module.exports = {
  getUserById,
  getUserByEmail,
  createUser,
  getUserAddressById,
  setAddress,
  
  getUserByContact,
};
// CRIO_SOLUTION_END_MODULE_UNDERSTANDING_BASICS
