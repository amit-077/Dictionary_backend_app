
const { User } = require("../models");
const Leaderboard = require("../models/Leaderboard"); // Replace with the correct path to your WordCategory model
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

//Below function helps to create a entry into leaderboard when user is registering. 
const setLeaderBoard = async (user) => {
    try {
        // Create a new leaderboard entry for the user
        const newEntry = await Leaderboard.create({
          userId: user._id,
          name: user.name,
          score: 0, 
          history: [], 
        });
    
        return true;
      } catch (error) {
        console.error('Error:', error);
        return false;
      }


};

module.exports = {
    setLeaderBoard,
};