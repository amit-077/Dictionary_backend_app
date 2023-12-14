// CRIO_SOLUTION_START_MODULE_AUTH
// CRIO_SOLUTION_END_MODULE_AUTH
const httpStatus = require("http-status");
const userService = require("./user.service");
const ApiError = require("../utils/ApiError");

/**
 * Login with username and password
 * - Utilize userService method to fetch user object corresponding to the email provided
 * - Use the User schema's "isPasswordMatch" method to check if input password matches the one user registered with (i.e, hash stored in MongoDB)
 * - If user doesn't exist or incorrect password,
 * throw an ApiError with "401 Unauthorized" status code and message, "Incorrect email or password"
 * - Else, return the user object
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  // CRIO_SOLUTION_START_MODULE_AUTH
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }
  return user;
  // CRIO_SOLUTION_END_MODULE_AUTH
};

const loginUserWithContactAndPassword = async (contact , password) => {
  const user = await userService.getUserByContact(contact);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect contact or password");
  }
  return user;
}



//Its used for login-with-otp
const loginUserWithContactAndPasswordNew = async (contact) => {
  const user = await userService.getUserByContact(contact);
  return user;
}


const loginUserWithEmailAndPasswordNew = async (email) => {
  const user = await userService.getUserByEmail(email);
  return user;
};

module.exports = {
  loginUserWithEmailAndPassword,
  loginUserWithContactAndPassword,
  loginUserWithContactAndPasswordNew,
  loginUserWithEmailAndPasswordNew
};
