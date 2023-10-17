

//todo
// API's to e created
// 1. GET to get the 10 questions of perticular word WordCategory
// 2. POST to submit the score of the user , update in LeaderBoard and user profile

// 3.GET fetch the the word categories with all the words inside it. 
// 4.update the Like on the word category , if any user Likes that category in app 

// 5. GET Fetch the Word_of_the_day 

// 6. GET fav words of the user 
// 7. POST add the word into the fav list of the user and also increase the count on the word as fav


const express = require("express");
const validate = require("../../middlewares/validate");
const userValidation = require("../../validations/user.validation");
const categoryController = require("../../controllers/category.controller");
const LeaderBoardController = require("../../controllers/LeaderBoard.controller");
const quizController = require("../../controllers/quiz.controller")
const auth = require("../../middlewares/auth");

const router = express.Router();


//Categories - working --------------------------------------------------------
  router.get(
    "/user-word-category/:userId",
    auth(),
    categoryController.getWordCategory,
  );

  router.get(
    "/word-list/:userId",
    auth(),
    categoryController.getWordList,
  );

  router.put(
    "/update-word-list/:userId",
    auth(),
    categoryController.updateWordList
  )


  //Quiz -----------------------------------------------------------------------
  router.get(
    "/quiz/:category",
    auth(),
    quizController.getQuestions,
  );

  router.post(
    "/quiz/score/:userId",
    auth(),
    quizController.setScore
  )


  //leaderBoard ------------------------------------------------------------------
  router.get(
    "/leader-board",
    auth() ,
    LeaderBoardController.getLeaders
  );

  




 //Favoutite Words - Incomplete
  // router.get(
  //   "/get-my-fav-words",
  //   auth(),
  //   wordifymeController.getFavWords,
  // )

  // router.post(
  //   "/get-my-fav-words",
  //   auth(),
  //   wordifymeController.getFavWords,
  // )


module.exports = router;


  
