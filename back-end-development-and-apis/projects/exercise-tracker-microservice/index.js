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
app.post('/api/users/:_id/exercises', function(req, res) {
  // pass
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
app.get('/api/users/:_id/logs', function(req, res) {
  // pass
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
});
