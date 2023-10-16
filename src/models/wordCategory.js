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
     },
     use_case:{
      type: String,
        required: true,
        trim: true,
     }
    },
  ],
});

const WordCategory = mongoose.model("WordCategory", wordCategorySchema);
module.exports = WordCategory;

// module.exports = {
//   WordCategory,
// };
