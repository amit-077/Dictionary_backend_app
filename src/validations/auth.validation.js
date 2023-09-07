// CRIO_SOLUTION_START_MODULE_AUTH
// CRIO_SOLUTION_END_MODULE_AUTH
const Joi = require("joi");
const { password } = require("./custom.validation");

// TODO: CRIO_TASK_MODULE_AUTH - Define request validation schema for user registration
/**
 * Check request *body* for fields (all are *required*)
 * - "email" : string and satisyfing email structure
 * - "password": string and satisifes the custom password structure defined in "src/validations/custom.validation.js"
 * - "name": string
 */
const register = {
  body: Joi.object().keys({
    contact: Joi.string().required(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    //city: Joi.string().required(),
    //college: Joi.string().required(),
    // dob: Joi.string().required(),
    // gender: Joi.string().required(),
  }),
  // CRIO_SOLUTION_END_MODULE_AUTH
};

/**
 * Check request *body* for fields (all are *required*)
 * - "contact" : string and satisyfing email structure
 * - "password": string and satisifes the custom password structure defined in "src/validations/custom.validation.js"
 */
const login = {
  // CRIO_SOLUTION_START_MODULE_AUTH
  body: Joi.object().keys({
    contact: Joi.string().required(),
    password: Joi.string().required(),
  }),
  // CRIO_SOLUTION_END_MODULE_AUTH
};

const send_otp = {
  body: Joi.object().keys({
    contact: Joi.string().required(),
  }),
};

const verify_otp = {
  body: Joi.object().keys({
    contact: Joi.string().required(),
    otp: Joi.number().required(),
  }),
};

module.exports = {
  register,
  login,
  send_otp,
  verify_otp,
};
