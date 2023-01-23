const httpStatus = require("http-status");
const userService = require("./user.service");
const ApiError = require("../utils/ApiError");
const axios = require('axios').default;

//redis
const redis = require('redis');
const client = redis.createClient();


client.on("error", (err) => {
  console.log("Redis Error")
  console.log(err);
});
client.connect();

//store the OTP in the redis cache 
const setotp = async (contact_number, otp) => {
  
  client.set(contact_number, otp);

  return true;
}

//get the OTP form the redis cache
const getotp = async (contact_number, otp) => {
  //  console.log(await client.connect());
  const fetched_otp = await client.get(contact_number);
  if (fetched_otp != otp) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect OTP");
  }

  return true;
}


//sending OTP to the users
const sendotp = async (contact_number) => {

  var val = await Math.floor(1000 + Math.random() * 9000);
  console.log("OTP Geneated : " + val);

  const instance = await axios.create({
    headers: {
      "authorization": "tl4vJzuUZL7cYe90DNgKoRFqynaP6X2WpTshmQdkxbSwAHC5iEEQ4WOiKhnoeqjIHdZkgBNR2PXL19ra",
      "Content-Type": "application/json"
    }
  });

  await instance.post('https://www.fast2sms.com/dev/bulkV2', {
    "route": "dlt",
    "sender_id": "UPCLIK",
    "message": "136307",
    "variables_values": val,
    "flash": 0,
    "numbers": contact_number,
  })
    .then(res => {
      const setOTP = setotp(contact_number, val)
      console.log(`statusCode: ${res.statusCode}`)
      console.log(res)

    })
    .catch(error => {
      console.error(error)
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, {
        status: "fail",
        statusCode: INTERNAL_SERVER_ERROR,
        data: "",
        message: "Somthing went wrong from our side"

      });
    });


  return val;




}

module.exports = {
  sendotp, getotp, setotp
};
