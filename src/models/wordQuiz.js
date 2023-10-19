const mongoose = require('mongoose');

const wordQuizSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },

    question: {
        type: String,
        required: true,
    },
    options: [
        {
            text: {
                type: String,
                required: true,
            },
            image: {
                type: String, // You can store the image URL or file path here
            },
            correctOption: {
                type: Boolean, //if option is correct the true else false
                required: true,
            }
        },
    ],

});

if (mongoose.models.WordQuiz) {
    delete mongoose.models.WordQuiz;
  }

const WordQuiz = mongoose.model('WordQuiz', wordQuizSchema);

module.exports = WordQuiz;