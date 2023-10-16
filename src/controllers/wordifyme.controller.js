const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const WordCategory= require("../models/WordCategory");
const { setUserWordCategory , userService } = require("../services");





const getWordCategory = catchAsync(async (req, res) => {
    const user = await userService.getUserById(req.params.userId);
  
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    
  //getting the user's choosen word categories.
    const wordCategories = user.wordCategories;
  
    res.send({
        wordCategories: wordCategories,
    });
  });




  const getWordList = catchAsync(async (req, res) => {

    const category = await WordCategory.findOne({ name: req.params.categoryName});

    if (category) {
        res.send({
            wordCategory: category,
        });
    } else {
      // Handle the case when the category is not found
      throw new ApiError(httpStatus.NOT_FOUND, "Category not found");
    }
  
    
  });

  

  module.exports = {
    getWordCategory,
    getWordList
  }