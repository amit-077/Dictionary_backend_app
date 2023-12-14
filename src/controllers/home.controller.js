const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const Leaderboard = require("../models/Leaderboard");
const Competition = require("../models/competition")
const { setUserWordCategory, userService } = require("../services");

const getHome = catchAsync(async (req, res) => {

    try {
       
        
        //competition and win
        const competitionData = await Competition.find({})


        //word of the day
        const wordOfTheDay = {
            'word':'calm',
            'meaning':'state of being silent'
        }


        //userprofile


    
        res.status(httpStatus.OK).send({
            status: "success",
            statusCode: httpStatus.OK,
            data: {competitionData,wordOfTheDay},
            message: "Home Data retrieved successfully!",
          })
      } catch (error) {
        console.error('Error:', error);
        throw new ApiError(httpStatus.NOT_FOUND, "Data for Home Screen not found");
      }


});

module.exports = {
    getHome,
  }
