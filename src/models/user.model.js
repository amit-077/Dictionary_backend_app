
const mongoose = require("mongoose");
// NOTE - "validator" external library and not the custom middleware at src/middlewares/validate.js
const validator = require("validator");
const bcrypt = require("bcryptjs");
const config = require("../config/config");
const { array } = require("joi");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    contact: {
      // CRIO_SOLUTION_START_MODULE_UNDERSTANDING_BASICS
      type: String  ,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      // https://www.npmjs.com/package/validator
      validate(value){
        if(!validator.isMobilePhone("91"+value) || value.length<10){
          throw new Error("Invalid Mobile")
        }
        
      },

    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
    },

    email:{
      type: String  ,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      default: config.default_email,
      validate(value){
        if(!validator.isEmail(value)){
          throw new Error("Email format is incorrect")
        }
      }

    },
    city:{
      type: String  ,
      required: true,
      trim: true,
      lowercase: true,
      default: config.default_city

    },
    college:{
      type: String  ,
      required: true,
      trim: true,
      lowercase: true,
      default: config.default_college

    },
    dob:{
      type: String  ,
      required: true,
      trim: true,
      lowercase: true,
      default: config.default_dob

    },
    gender:{
      type: String  ,
      required: true,
      trim: true,
      lowercase: true,
      default: config.default_gender

    },
    interest:{
      type: Array ,
      required: true,
      trim: true,
      lowercase: true,
      default: config.default_interest

    },
    walletMoney: {
      // CRIO_SOLUTION_START_MODULE_UNDERSTANDING_BASICS
      type: Number,
      required: true,
      default: config.default_wallet_money,
      // CRIO_SOLUTION_END_MODULE_UNDERSTANDING_BASICS
    },
    address: {
      type: String,
      lowercase: true,
      default: config.default_address,
    },
  },
  // Create createdAt and updatedAt fields automatically
  {
    timestamps: true,
  }
);



//  Check if contact is taken
userSchema.statics.isContactTaken = async function (contact) {
  const user = await this.findOne({ contact });
  return !!user;
};



//  Check if entered password matches the user's password
 userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);

};

// CRIO_SOLUTION_START_MODULE_AUTH
// NOTE - Quiz or mention in debrief on next() - middleware?
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});
// CRIO_SOLUTION_END_MODULE_AUTH

/**
 * Check if user have set an address other than the default address
 * - should return true if user has set an address other than default address
 * - should return false if user's address is the default address
 *
 * @returns {Promise<boolean>}
 */
userSchema.methods.hasSetNonDefaultAddress = async function () {
  const user = this;
  // CRIO_UNCOMMENT_START_MODULE_TEST
  // return user.address === config.default_address;
  // CRIO_UNCOMMENT_END_MODULE_TEST
  // CRIO_SOLUTION_START_MODULE_TEST
  return user.address !== config.default_address;
  // CRIO_SOLUTION_END_MODULE_TEST
};

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS
/*
 * Create a Mongoose model out of userSchema and export the model as "User"
 * Note: The model should be accessible in a different module when imported like below
 * const User = require("<user.model file path>").User;
 */
/**
 * @typedef User
 */
// CRIO_SOLUTION_START_MODULE_UNDERSTANDING_BASICS
const User = mongoose.model("User", userSchema);

module.exports.User = User;
module.exports = {
  User,
};
// CRIO_SOLUTION_END_MODULE_UNDERSTANDING_BASICS
