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

// create a new user
app.post('/api/users', async function(req, res) {
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

// this is what I want:
// {
//   username: "fcc_test",
//   description: "test",
//   duration: 60,
//   date: "Mon Jan 01 1990",
//   _id: "5fb5853f734231456ccb3b05"
// }
// this is what I'm getting back:
// {
//   "username":"mgermai2",
//   "description":"partying",
//   "duration":75,
//   "date":"Thu Aug 08 2024",
//   "_id":"66cf57be2fb30bf35d5e46a3"
// }

// create an exercise for a user
app.post('/api/users/:_id/exercises', async function(req, res) {
  console.log("In the exercises/workouts POST request");
  // the body looks like this:
  // {":_id":"66c4fac95d65b665ec1e721b","description":"running","duration":"50","date":"2024-08-20"}
  const user_id = req.params._id;
  const description = req.body.description;
  const duration = req.body.duration;
  const date = req.body.date;
  console.log(`${user_id}, ${description}, ${duration}, ${date}`)

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
        date: date ? new Date(date).toDateString() : new Date().toDateString()
      });
      try {
        // save the new workout to the database
        const workout = await workoutDocument.save();
        console.log(JSON.stringify(workout.date.toDateString()), typeof(JSON.stringify(workout.date.toDateString())))
        console.log(`
          ${user.username, typeof(user.username)},
          ${workout.description, typeof(workout.description)},
          ${workout.duration, typeof(workout.duration)},
          ${workout.date.toDateString(), typeof(workout.date)},
          ${workout._id, typeof(workout.user_id)},
        `)
        console.log(deepEqual(JSON.stringify(workout), JSON.stringify({
          username: user.username,
          usernameType: typeof(user.username),
          description: workout.description,
          descriptionType: typeof(workout.description),
          duration: Number(workout.duration),
          durationType: typeof(workout.duration),
          date: workout.date.toDateString(),
          dateType: typeof(workout.date.toDateString()),
          _id: workout._id,
          _id: workout.user_id
        })))
        res.json({
          username: user.username,
          usernameType: typeof(user.username),
          description: workout.description,
          descriptionType: typeof(workout.description),
          duration: Number(workout.duration),
          durationType: typeof(workout.duration),
          date: workout.date.toDateString(),
          dateType: typeof(workout.date.toDateString()),
          _id: workout._id,
          _id: workout.user_id
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
app.get('/api/users/:_id/logs', async function(req, res) {

  console.log("In the user logs GET request");

  // objects in which to store any date parameters that were passed in
  const logObject = {}
  const exerciseLogFilter = {}
  const dateFilter = {}

  // retrieve the id from the url
  const user_id = req.params._id;
  console.log(user_id)
  logObject["_id"] = user_id
  console.log(`Here is the log object: ${JSON.stringify(logObject)}`)
  
  // add the user id as the first part of the filter
  exerciseLogFilter["_id"] = user_id
  console.log(`Here is the exercise log filter: ${JSON.stringify(exerciseLogFilter)}`)

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
  console.log(`Here is the date filter: ${JSON.stringify(dateFilter)}`);

  // make the limit 100 if no limit is provided
  const limit = req.query.limit ? Number(req.query.limit) : 100;
  console.log(`Here's the limit: ${limit}, ${typeof(limit)}`);
  
  try {
    // look up the user in the database
    const user = await User.findById(user_id);
    if (!user) {
      res.send("Could not find a user.")
    } else {
      // get the username from the user object
      console.log(`Here is the user: ${JSON.stringify(user)}`)
      logObject["username"] = user.username;
      // next, search for the user's workouts
      try {
        // get the count of workouts back and add it to the log object
        const numWorkouts = await Workout.countDocuments({user_id: user._id});
        logObject["count"] = Number(numWorkouts);
        const workouts = await Workout.find({
          user_id: user._id
        }).limit(limit);
        // logObject["log"] = []
        console.log(`Here are the workouts: ${workouts}`)
        // format the exercise logs in accordance with what it supposed to be returned
        const log = workouts.map(workout => ({
          description: workout.description,
          duration: Number(workout.duration),
          date: workout.date.toDateString()
        }));
        logObject["log"] = log;
        console.log(`Here is the most up-to-date version of the logObject: ${JSON.stringify(logObject)}`);
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