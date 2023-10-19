const mongoose = require('mongoose');
const leaderBoard  = require('../models/Leaderboard'); // Replace with the actual path to your model file

mongoose.connect('mongodb+srv://audumber:Ramdas3000@cluster0.bj3vd.mongodb.net/LaundryApplication?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('Connection error:', error);
});

db.once('open', async () => {
  // Create more dummy data
  const dummyData = [
    {
      name: 'Alice',
      score: 100,
      history: [
        { score: 100 },
        { score: 110 },
        { score: 105 },
      ],
    },
    {
      name: 'Bob',
      score: 90,
      history: [
        { score: 90 },
        { score: 95 },
        { score: 92 },
      ],
    },
    {
      name: 'Charlie',
      score: 80,
      history: [
        { score: 80 },
        { score: 85 },
        { score: 78 },
      ],
    },
    {
      name: 'David',
      score: 70,
      history: [
        { score: 70 },
        { score: 72 },
        { score: 68 },
      ],
    },
    {
      name: 'Eve',
      score: 110,
      history: [
        { score: 110 },
        { score: 112 },
        { score: 108 },
      ],
    },
    {
      name: 'Frank',
      score: 95,
      history: [
        { score: 95 },
        { score: 97 },
        { score: 92 },
      ],
    },
    {
      name: 'Grace',
      score: 120,
      history: [
        { score: 120 },
        { score: 125 },
        { score: 118 },
      ],
    },
    {
      name: 'Hank',
      score: 60,
      history: [
        { score: 60 },
        { score: 62 },
        { score: 58 },
      ],
    },
    {
      name: 'Ivy',
      score: 85,
      history: [
        { score: 85 },
        { score: 90 },
        { score: 83 },
      ],
    },
    {
      name: 'Jack',
      score: 105,
      history: [
        { score: 105 },
        { score: 110 },
        { score: 103 },
      ],
    },
  ];
  
  module.exports = dummyData;
  

  try {
    // Insert the dummy data into the database
    await leaderBoard.insertMany(dummyData);

    console.log('Dummy data has been inserted into the database.');
  } catch (error) {
    console.error('Error inserting dummy data:', error);
  } finally {
    // Close the database connection
    db.close();
  }
});