const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');
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

// create a new user
app.post('/api/users', async function(req, res) {
  console.log("In the users POST request");
  // retrieve the user-input url
  const username = req.body.username;
  // construct the valid user
  const userDocument = new User({
    username: username
  })
  try {
    // save the new user to the database
    const user = await userDocument.save();
    res.json(user);
  } catch (err) {
    console.log(err)
  }
});

// create an exercise for a user
app.post('/api/users/:_id/exercises', async function(req, res) {
  // pass
  console.log("In the exercises/workouts POST request");
  // retrieve the user-input url
  const user_id = req.body.id;
  // const username = req.body.username;
  const description = req.body.description;
  const duration = req.body.duration;
  const date = req.body.date;

  try {
    const username = await User.find({ _id: +user_id}).select("username");
    console.log(username);
  } catch (err) {
    console.log(err);
  }
  
  // // construct the valid user
  // const userDocument = new User({
  //   username: username
  // })
  // try {
  //   // save the new user to the database
  //   const user = await userDocument.save();
  //   res.json(user);
  // } catch (err) {
  //   console.log(err)
  // }
});

// get a list of users
app.get('/api/users', async function(req, res) {
  console.log("In the users GET request");
  // get the users from the database
  try {
    const users = await User.find({}).select("_id username");
    if (!users) {
      req.send(["No users found!"])
    } else {
      console.log(users);
      res.json(users);
    }
  } catch (err) {
    console.log(err)
  }
});

// get a list of a user's exercises
app.get('/api/users/:_id/logs', async function(req, res) {
  // pass
  console.log("In the user logs GET request");
  // retrieve the id from the url
  const user_id = req.params.id;

  // get the users from the database
  try {
    // look up the user in the database
    const workouts = await Workout.find({id: +user_id});
    const user = await User.find({id: +user_id});
    if (!workouts) {
      req.send(["No users found!"])
    } else {
      console.log(workouts);
      const numWorkouts = workouts.length;

      res.json();
    }
  } catch (err) {
    console.log(err)
  }
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
});
