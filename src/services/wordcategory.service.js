const { User } = require("../models");
const { WordCategory } = require("../models/wordCategory"); // Replace with the correct path to your WordCategory model
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const setUserWordCategory = async (user, topics) => {
  try {
    // Query the WordCategory model to find categories with matching tags
    const wordCategoriesResult = await WordCategory.find({ tags: { $in: topics } });

    if (!wordCategoriesResult || wordCategoriesResult.length === 0) {
      // Handle the case where no matching categories were found
      console.log("No matching categories found.");
      return false; // Or handle it as appropriate for your use case
    }

    // Extract the category names, details, and add them to List2
    const List2 = wordCategoriesResult.map(category => ({
      name: category.name,
      totalWords: category.totalWords,
      likes: category.likes,
      isPremium: category.isPremium,
      tags: category.tags,
      wordsList: category.wordsList,
      // image: category.image
    }));

    console.log(List2);

    user.wordCategories = List2;
    await user.save();
    return true;
  } catch (error) {
    console.error('Error setting user word categories:', error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error setting user word categories');
  }
};

module.exports = {
  setUserWordCategory,
};
