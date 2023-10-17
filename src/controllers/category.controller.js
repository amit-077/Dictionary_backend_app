const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const WordCategory = require("../models/WordCategory");
const { setUserWordCategory, userService } = require("../services");





const getWordCategory = catchAsync(async (req, res) => {
  
  const user = await userService.getUserById(req.params.userId);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  //getting the user's choosen word categories.
  const wordCategories = user.wordCategories;

  res.status(httpStatus.OK).send({
    status: "success",
    statusCode: httpStatus.OK,
    data: wordCategories,
    message: "Category Found successfully!",
  });
});



//here will get the list of words from user's specific word category
const getWordList = catchAsync(async (req, res) => {

  const user = await userService.getUserById(req.params.userId);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  wordCategories = user.wordCategories
  const foundCategory = wordCategories.find(category => category.name === req.body.categoryName);

  if (foundCategory) {
    // The `foundCategory` variable now contains the category with the desired name
    console.log('Found category:', foundCategory);
    res.status(httpStatus.OK).send({
      status: "success",
      statusCode: httpStatus.OK,
      data: foundCategory,
      message: "Category Found successfully!",
    });
  } else {
    console.log('Category not found');
    res.status(httpStatus.NOT_FOUND).send({
      status: "failed",
      statusCode: httpStatus.NOT_FOUND,
      data: "",
      message: "Category not found",
    });
  }
});


const updateWordList = catchAsync(async (req, res) => {

    const user = await userService.getUserById(req.params.userId);
    const categoryNameToUpdate = req.body.name;
    const updatedCategoryData = req.body;
    const categoryIndex = user.wordCategories.findIndex(category => category.name === categoryNameToUpdate);
  
    if (categoryIndex !== -1) {
      user.wordCategories[categoryIndex] = updatedCategoryData;
      await user.save();
  
      console.log(`Category updated at index ${categoryIndex}`);
      console.log(user.wordCategories);
      res.status(httpStatus.OK).send({
        status: "success",
        statusCode: httpStatus.OK,
        data: foundCategory,
        message: "Category Updated successfully!",
      });
    } else {
      console.log(`Category '${categoryNameToUpdate}' not found.`);
      res.status(httpStatus.NOT_FOUND).send({
        status: "failed",
        statusCode: httpStatus.NOT_FOUND,
        data: "",
        message: "Category not found",
      });
    }

})






module.exports = {
  getWordCategory,
  getWordList,
  updateWordList
}