// CRIO_SOLUTION_START_MODULE_AUTH
// CRIO_SOLUTION_END_MODULE_AUTH
const express = require("express");
const validate = require("../../middlewares/validate");
const authValidation = require("../../validations/auth.validation");
const authController = require("../../controllers/auth.controller");

const router = express.Router();

// TODO: CRIO_TASK_MODULE_AUTH - Implement "/v1/auth/register" and "/v1/auth/login" routes with request validation
// CRIO_SOLUTION_START_MODULE_AUTH
router.post(
  "/register",
  validate(authValidation.register),
  authController.register
);
router.post("/login", validate(authValidation.login), authController.login);
// CRIO_SOLUTION_END_MODULE_AUTH


//verify
router.post("/otp/send" ,  validate(authValidation.send_otp) , authController.send_otp)
router.post("/otp/verify", validate(authValidation.verify_otp) , authController.verify_otp)

module.exports = router;
