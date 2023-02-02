// CRIO_SOLUTION_START_MODULE_AUTH
// CRIO_SOLUTION_END_MODULE_AUTH
const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { authService, userService, tokenService, otpService } = require("../services");

/**
 * Perform the following steps:
 * -  Call the userService to create a new user
 * -  Generate auth tokens for the user
 * -  Send back
 * --- "201 Created" status code
 * --- response in the given format
 *
 * Example response:
 *
 * {
 *  "user": {
 *      "_id": "5f71b31888ba6b128ba16205",
 *      "name": "crio-user",
 *      "email": "crio-user@gmail.com",
 *      "password": "$2a$08$bzJ999eS9JLJFLj/oB4he.0UdXxcwf0WS5lbgxFKgFYtA5vV9I3vC",
 *      "createdAt": "2020-09-28T09:55:36.358Z",
 *      "updatedAt": "2020-09-28T09:55:36.358Z",
 *      "__v": 0
 *  },
 *  "tokens": {
 *      "access": {
 *          "token": "eyJhbGciOiJIUz....",
 *          "expires": "2020-10-22T09:29:01.745Z"
 *      }
 *  }
 *}
 *
 */
const register = catchAsync(async (req, res) => {

  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({
    status: "success",
    statusCode: httpStatus.CREATED,
    token: tokens,
    data: user,
    message: "User created successfully!",
  });

});

/**
 * Perform the following steps:
 * -  Call the authservice to verify is password and email is valid
 * -  Generate auth tokens
 * -  Send back
 * --- "200 OK" status code
 * --- response in the given format
 *
 * Example response:
 *
 * {
 *  "user": {
 *      "_id": "5f71b31888ba6b128ba16205",
 *      "name": "crio-user",
 *      "email": "crio-user@gmail.com",
 *      "password": "$2a$08$bzJ999eS9JLJFLj/oB4he.0UdXxcwf0WS5lbgxFKgFYtA5vV9I3vC",
 *      "createdAt": "2020-09-28T09:55:36.358Z",
 *      "updatedAt": "2020-09-28T09:55:36.358Z",
 *      "__v": 0
 *  },
 *  "tokens": {
 *      "access": {
 *          "token": "eyJhbGciOiJIUz....",
 *          "expires": "2020-10-22T09:29:01.745Z"
 *      }
 *  }
 *}
 *
 */
const login = catchAsync(async (req, res) => {
  // CRIO_SOLUTION_START_MODULE_AUTH
  const { contact, password } = req.body;
  const user = await authService.loginUserWithContactAndPassword(contact, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
  // CRIO_SOLUTION_END_MODULE_AUTH
});


const send_otp = catchAsync(async (req, res) => {
  const { contact } = req.body;
  const sms = await otpService.sendotp(contact);
  res.status(httpStatus.OK).send ({
    status: "success",
    statusCode: httpStatus.OK,
    data: "",
    message: "OTP Send successfully!"

  });
})

const verify_otp = catchAsync(async (req, res) => {
  const { contact, otp } = req.body;
  const verify = await otpService.getotp(contact, otp);

  //cheking weather this is user of our app or not , if yes directly loggin in.
  const user = await authService.loginUserWithContactAndPasswordNew(contact);
  if (!user) {
    res.send(httpStatus.OK, {
      code:httpStatus.OK,
      status: "fail",
      redirect: true,
      data: "",
      message: "User not found , Redirect to signup page"

    })
  }
  const tokens = await tokenService.generateAuthTokens(user);
  res.send(httpStatus.CREATED, {
    code: httpStatus.OK,
    status: "success",
    redirect: false,
    data: user,
    token: tokens,
    message: "Login Successfully , Redirect to home page"

  })

})

module.exports = {
  register,
  login,
  send_otp,
  verify_otp,
};
