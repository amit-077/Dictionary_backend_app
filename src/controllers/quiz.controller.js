const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const Leaderboard = require("../models/Leaderboard");
const WordQuiz = require("../models/wordQuiz");
const { setUserWordCategory, userService } = require("../services");

const getQuestions = catchAsync(async (req, res) => {
  const categoryName = req.params.category; // Assuming the category name is in the URL parameter.

  try {
    const questions = await WordQuiz.find({ category: categoryName });

    if (questions.length === 0) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: "failed",
        statusCode: httpStatus.NOT_FOUND,
        data: null,
        message: "Category not found",
      });
    }

    return res.status(httpStatus.OK).json({
      status: "success",
      statusCode: httpStatus.OK,
      data: questions,
      message: "Questions retrieved successfully!",
    });
  } catch (error) {
    console.error("Error:", error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error from getQuestions Function");
  }
});


const setScore = catchAsync(async (req, res) => {
    
    try {
        // Update the user's score in UserProfile
        const userId = req.params.userId;
        const user = await userService.getUserById(userId);
        if (!user) {
          // Handle the case where the user doesn't exist
          return res.status(httpStatus.NOT_FOUND).json({
            status: "failed",
            statusCode: httpStatus.NOT_FOUND,
            data: null,
            message: "User not found",
          });
        }
    
        // Update the user's score
        user.points += req.body.score;
        await user.save();
    
        // Update the score in Leaderboard
        const entry = await Leaderboard.findOne({ userId });
        if (entry) {
          // If the entry exists, update the score and history
          const oldScore = entry.score;
          entry.score = oldScore + req.body.score;
          entry.history.push({ score: req.body.score });
          await entry.save();
        } else {
          // Handle the case where the user is not found in the leaderboard
          return res.status(httpStatus.NOT_FOUND).json({
            status: "failed",
            statusCode: httpStatus.NOT_FOUND,
            data: null,
            message: "User not found in the leaderboard",
          });
        }
    
        // Respond with a success message
        return res.status(httpStatus.OK).json({
          status: "success",
          statusCode: httpStatus.OK,
          data: null,
          message: "Score updated successfully!",
        });
    } catch (error) {
      console.error("Error:", error);
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error from SetScore Function");
    }
  });




module.exports = {
    getQuestions,
    setScore
  }
