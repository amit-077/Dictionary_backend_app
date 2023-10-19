const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const Leaderboard = require("../models/Leaderboard");
const { setUserWordCategory, userService } = require("../services");

const getLeaders = catchAsync(async (req, res) => {

    try {
        // If you want to sort the entries by a specific field, e.g., 'score', you can do so like this:
        const sortedEntries = await Leaderboard.find({}).sort({ score: -1 });
    
        res.status(httpStatus.OK).send({
            status: "success",
            statusCode: httpStatus.OK,
            data: sortedEntries,
            message: "Questions retrieved successfully!",
          })
      } catch (error) {
        console.error('Error:', error);
        throw new ApiError(httpStatus.NOT_FOUND, "Data in LeaderBoard not found");
      }


});

module.exports = {
    getLeaders,
  }
