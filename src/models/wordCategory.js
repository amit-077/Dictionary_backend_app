const mongoose = require("mongoose");

const wordCategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  image: {
    type: String,
  },
  totalWords: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  isPremium: {
    type: Boolean,
    default: false,
  },
  //this tag is used to choose word category for which user is looking for based on topics he choose.
  tags:{
    type: Array,
    default: [],
  },
  isCompleted:{
    type: Boolean,
    default: false,
  },
  wordsList: [
    {
      word: {
        type: String,
        required: true,
        trim: true,
      },
     meaning : {
      type: String,
        required: true,
        trim: true,
     },
     Image:{
      type: String,
      trim: true,
     },
     use_case:{
      type: String,
        required: true,
        trim: true,
     },
     isKnown:{
      type: String,
      default:"unknown",
      trim: true,
      //options : unknown , yes , no
     }
    },
  ],
});

const WordCategory = mongoose.model("WordCategory", wordCategorySchema);
module.exports = WordCategory;

// module.exports = {
//   WordCategory,
// };
