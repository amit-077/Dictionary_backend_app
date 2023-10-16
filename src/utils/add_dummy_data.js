const mongoose = require('mongoose');
const Leaderboard = require('../models/leaderBoard'); // Replace with the actual path to your model file

mongoose.connect('mongodb+srv://audumber:Ramdas3000@cluster0.bj3vd.mongodb.net/LaundryApplication?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('Connection error:', error);
});

db.once('open', async () => {
  // Create dummy leaderboard entries
  const dummyData = [
    {
      userId: mongoose.Types.ObjectId(), // Replace with a valid user ID
      name: 'John Doe',
      score: 100,
    },
    {
      userId: mongoose.Types.ObjectId(), // Replace with another valid user ID
      name: 'Jane Smith',
      score: 95,
    },
    {
      userId: mongoose.Types.ObjectId(),
      name: 'Alice Johnson',
      score: 90,
    },
    {
      userId: mongoose.Types.ObjectId(),
      name: 'Bob Anderson',
      score: 85,
    },
    {
      userId: mongoose.Types.ObjectId(),
      name: 'Ella Davis',
      score: 80,
    },
    {
      userId: mongoose.Types.ObjectId(),
      name: 'Michael Brown',
      score: 75,
    },
    {
      userId: mongoose.Types.ObjectId(),
      name: 'Olivia Wilson',
      score: 70,
    },
    {
      userId: mongoose.Types.ObjectId(),
      name: 'David Lee',
      score: 65,
    },
    {
      userId: mongoose.Types.ObjectId(),
      name: 'Sophia Evans',
      score: 60,
    },
    {
      userId: mongoose.Types.ObjectId(),
      name: 'William Clark',
      score: 55,
    },
    // Add more entries here if needed
  ];

  try {
    // Insert the dummy data into the database
    await Leaderboard.insertMany(dummyData);

    console.log('Dummy data has been inserted into the leaderboard.');
  } catch (error) {
    console.error('Error inserting dummy data:', error);
  } finally {
    // Close the database connection
    db.close();
  }
});