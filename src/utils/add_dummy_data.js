const mongoose = require('mongoose');
const LeaderBoard  = require('../models/Leaderboard'); // Replace with the actual path to your model file

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
      "userId": "user1",
      "name": "John Doe",
      "score": 150,
      "history": [
        {
          "timestamp": "2023-01-01T12:00:00Z",
          "score": 100
        },
        {
          "timestamp": "2023-01-02T14:30:00Z",
          "score": 50
        }
      ]
    },
    {
      "userId": "user2",
      "name": "Jane Smith",
      "score": 200,
      "history": [
        {
          "timestamp": "2023-01-03T10:45:00Z",
          "score": 150
        },
        {
          "timestamp": "2023-01-04T16:20:00Z",
          "score": 50
        }
      ]
    },
    {
      "userId": "user3",
      "name": "Alice Johnson",
      "score": 75,
      "history": [
        {
          "timestamp": "2023-01-05T08:15:00Z",
          "score": 75
        }
      ]
    },
    {
      "userId": "user4",
      "name": "Bob Williams",
      "score": 120,
      "history": [
        {
          "timestamp": "2023-01-06T11:30:00Z",
          "score": 120
        }
      ]
    },
    {
      "userId": "user5",
      "name": "Eva Davis",
      "score": 90,
      "history": [
        {
          "timestamp": "2023-01-07T09:20:00Z",
          "score": 90
        }
      ]
    },
    {
      "userId": "user6",
      "name": "Chris Brown",
      "score": 180,
      "history": [
        {
          "timestamp": "2023-01-08T13:45:00Z",
          "score": 150
        },
        {
          "timestamp": "2023-01-09T15:10:00Z",
          "score": 30
        }
      ]
    },
    {
      "userId": "user7",
      "name": "Olivia Taylor",
      "score": 100,
      "history": [
        {
          "timestamp": "2023-01-10T07:55:00Z",
          "score": 100
        }
      ]
    },
    {
      "userId": "user8",
      "name": "Daniel Clark",
      "score": 160,
      "history": [
        {
          "timestamp": "2023-01-11T12:30:00Z",
          "score": 120
        },
        {
          "timestamp": "2023-01-12T14:15:00Z",
          "score": 40
        }
      ]
    },
    {
      "userId": "user9",
      "name": "Sophia Anderson",
      "score": 80,
      "history": [
        {
          "timestamp": "2023-01-13T09:40:00Z",
          "score": 80
        }
      ]
    },
    {
      "userId": "user10",
      "name": "Liam Baker",
      "score": 130,
      "history": [
        {
          "timestamp": "2023-01-14T11:20:00Z",
          "score": 130
        }
      ]
    }
  ];
  
  module.exports = dummyData;
  

  try {
    // Insert the dummy data into the database
    await LeaderBoard.create(dummyData);

    console.log('Dummy data has been inserted into the database.');
  } catch (error) {
    console.error('Error inserting dummy data:', error);
  } finally { 
    // Close the database connection
    db.close();
  }
});