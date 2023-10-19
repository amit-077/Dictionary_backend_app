// CRIO_SOLUTION_START_MODULE_UNDERSTANDING_BASICS
// CRIO_SOLUTION_END_MODULE_UNDERSTANDING_BASICS
const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

const DEFAULT_WALLET_MONEY = 500;
const DEFAULT_LEVEL_OF_ENGLISH= "L0";
const DEFAULT_PAYMENT_OPTION = "PAYMENT_OPTION_DEFAULT";
const DEFAULT_ADDRESSS = "ADDRESS_NOT_SET";

const DEFAULT_EMAIL = "notset@gmail.com";
const DEFAULT_CITY = "CITY_NOT_SET";
const DEFAULT_COLLEGE = "COLLEGE_NOT_SET";
const DEFAULT_GENDER = "GENDER_NOT_SET";
const DEFAULT_INTEREST = ["INTEREST_NOT_SET"];
const DEFAULT_DOB = "DOB_NOT_SET";
const DEFAULT_PROFESSION = "PROFESSION_NOT_SET"
const DEFAULT_PROFILE_IMAGE = "https://i.pinimg.com/564x/33/ba/df/33badf7bd7e2bd56b21e3d972fe3ed5a.jpg"

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description("Mongo DB url"),
    JWT_SECRET: Joi.string().required().description("JWT secret key"),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
      .default(1)
      .description("minutes after which access tokens expire"),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
      .default(365)
      .description("days after which refresh tokens expire"),
      REDIS_HOST:Joi.string().required().description("Redis url"),
      REDIS_PORT:Joi.string().required().description("Redis Port"),
      REDIS_USER:Joi.string().required().description("Redis user"),
      REDIS_PASS:Joi.string().required() 
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  // Set mongoose configuration
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === "test" ? "-test" : ""),
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  //Set Redis configuration
  // redis_host:envVars.REDIS_HOST,
  // redis_port: envVars.REDIS_PORT,
  // redis_user: envVars.REDIS_USER,
  // redis_pass: envVars.REDIS_PASS,
  redis_host:"containers-us-west-127.railway.app",
  redis_port: 7126,
  redis_user: "default",
  redis_pass: "MorjBMssUy2Ff8ouqKdq",

  default_wallet_money: DEFAULT_WALLET_MONEY,
  default_payment_option: DEFAULT_PAYMENT_OPTION,
  default_address: DEFAULT_ADDRESSS,
  default_email : DEFAULT_EMAIL,
  default_city : DEFAULT_CITY,
  default_college : DEFAULT_COLLEGE,
  default_dob : DEFAULT_DOB,
  default_gender : DEFAULT_GENDER,
  default_interest : DEFAULT_INTEREST,
  default_level_of_english: DEFAULT_LEVEL_OF_ENGLISH,
  default_profession: DEFAULT_PROFESSION,
  default_profile_image:DEFAULT_PROFILE_IMAGE,
 
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
  },
};
