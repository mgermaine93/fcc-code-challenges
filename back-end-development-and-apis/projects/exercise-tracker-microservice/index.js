const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');
const { deepEqual } = require('assert');
const { Schema } = mongoose;
require('dotenv').config()

MONGO_URL = process.env.MONGO_URL;

// set up the mongo DB connection
mongoose.connect(MONGO_URL);

// the schema used for users
const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
});
// compile model from schema
const User = mongoose.model("User", userSchema);

// the schema used for workouts/exercises
const workoutSchema = new Schema({
  user_id: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: false
  },
  username: {
    type: String,
    required: false
  }
});
// compile model from schema
const Workout = mongoose.model("Workout", workoutSchema);

// middleware
app.use(cors())
app.use(express.static('public'))
app.use(express.json());
// this helps to get the body of any requests
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

// get a list of users
app.get('/api/users', async (req, res) => {
  console.log("In the users GET request");
  // get the users from the database
  try {
    const users = await User.find({}).select("_id username");
    if (!users) {
      req.send(["No users found!"])
    } else {
      res.json(users);
    }
  } catch (err) {
    console.log(err);
    res.send(`There was an error with retrieving the user: ${err}`)
  }
});

// create a new user
app.post('/api/users', async (req, res) => {
  console.log("In the users POST request");
  // retrieve the user-input url
  const username = req.body.username;
  // construct the valid user
  const userDocument = new User({
    username: username
  });
  try {
    // save the new user to the database
    const user = await userDocument.save();
    res.json(user);
  } catch (err) {
    console.log(err)
    res.send(`There was an error with saving the user: ${err}`)
  }
});

// create an exercise for a user
app.post('/api/users/:_id/exercises', async (req, res) => {

  console.log("In the exercises/workouts POST request");
  const user_id = req.params._id;
  const description = req.body.description;
  const duration = req.body.duration;
  const date = req.body.date;

  try {
    const user = await User.findById(user_id);
    if (!user) {
      res.send("Could not find user.")
    } else {
      const workoutDocument = new Workout({
        user_id: user._id,
        description: description,
        duration: duration,
        // if no date is provided, use the current date
        date: date ? new Date(date) : new Date(),
        username: user.username
      });
      try {
        // save the new workout to the database
        const workout = await workoutDocument.save();
        const actual = JSON.stringify(workout)
        const expected = JSON.stringify({
          user_id: user._id,
          description: workout.description,
          duration: Number(workout.duration),
          date: new Date(workout.date),
          username: user.username,
        })

        console.log(`Here is the ACTUAL: ${actual}`);
        console.log(`Here is the EXPECTED: ${expected}`);
        // uncomment the line below to see the results of the test
        // console.log(deepEqual(actual, expected));
        res.json({
          _id: user._id,
          username: user.username,
          description: workout.description,
          duration: workout.duration,
          date: new Date(workout.date).toDateString()
        })
      } catch (err) {
        console.log(err);
        res.send(`There was an error with saving the workout: ${err}`);
      }
    }
  } catch (err) {
    console.log(err);
    res.send(`There was an error with retrieving the user: ${err}`);
  }
});

// get a list of a user's exercises
app.get('/api/users/:_id/logs', async (req, res) => {

  console.log("In the user logs GET request");

  // objects in which to store any date parameters that were passed in
  const logObject = {}
  const exerciseLogFilter = {}
  const dateFilter = {}

  // retrieve the id from the url
  const user_id = req.params._id;
  logObject["_id"] = user_id
  
  // add the user id as the first part of the filter
  exerciseLogFilter["_id"] = user_id

  // check for additional date parameters
  let from = req.query.from;
  if (from) {
    dateFilter["$gte"] = new Date(from);
  }
  let to = req.query.to;
  if (to) {
    dateFilter["$lte"] = new Date(to); 
  }
  if (from || to) {
    exerciseLogFilter.date = dateFilter;
  }

  // make the limit 100 if no limit is provided
  const limit = req.query.limit ? Number(req.query.limit) : 100;
  
  try {
    // look up the user in the database
    const user = await User.findById(user_id);
    if (!user) {
      res.send("Could not find a user.")
    } else {
      // get the username from the user object
      logObject["username"] = user.username;
      // next, search for the user's workouts
      try {
        // get the count of workouts back and add it to the log object
        const numWorkouts = await Workout.countDocuments({user_id: user._id});
        logObject["count"] = Number(numWorkouts);
        const workouts = await Workout.find({
          user_id: user._id
        }).limit(limit);
        // format the exercise logs in accordance with what it supposed to be returned
        const log = workouts.map(workout => ({
          description: workout.description,
          duration: Number(workout.duration),
          date: workout.date.toDateString()
        }));
        logObject["log"] = log;
        res.json(logObject);
      } catch (err) {
        console.log(err);
        res.send(`There was an error that occurred while looking up the workouts: ${err}`);
      }
    }
  } catch (err) {
    console.log(err);
    res.send(`There was an error that occurred while looking up the user: ${err}`);
  }
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
});