const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
  userId: {
    type:String,
    required: true
  },

  name: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 0
  },
  history: [
    {
      timestamp: {
        type: Date,
        default: Date.now,
      },
      score: {
        type: Number,
        default:0
      },
    },
  ],
});

//Below code is used to delete the model if its present already. As sometimes it was throwing error.
if (mongoose.models.Leaderboard) {
  delete mongoose.models.Leaderboard;
}

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

/**
 * @typedef Leaderboard
 */

module.exports.Leaderboard = Leaderboard;
module.exports = {
  Leaderboard,
};
