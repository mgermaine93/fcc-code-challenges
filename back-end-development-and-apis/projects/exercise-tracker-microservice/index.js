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
app.post('/api/users/:_id/exercises', async function(req, res) {
  console.log("In the exercises/workouts POST request");
  // the body looks like this:
  // {":_id":"66c4fac95d65b665ec1e721b","description":"running","duration":"50","date":"2024-08-20"}
  const user_id = req.params._id;
  const description = req.body.description;
  const duration = req.body.duration;
  // if a date is provided, use that date.  if a date is not provided, then use the current date.
  const date = req.body.date;
  console.log(`${user_id}, ${description}, ${duration}, ${date}`)

  try {
    const user = await User.findById(user_id);
    if (!user) {
      res.send("Could not find user.")
    } else {
      const username = user.username;
      // construct the valid user
      const workoutDocument = new Workout({
        _id: user._id,
        // username: username,
        description: description,
        duration: duration,
        date: date ? new Date(date) : new Date()
      });
      try {
        // save the new workout to the database
        const workout = await workoutDocument.save();
        res.json({
          _id: user._id,
          username: user.username,
          description: workout.description,
          duration: Number(workout.duration),
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
  const user_id = req.params._id;
  let from = req.params.from;
  if (from) {
    from = new Date(req.params.from)
  }
  let to = req.params.to ;
  if (to) {
    to = new Date(req.params.to) 
  }
  const limit = req.params.limit ? req.params.limit : 100;

  try {
    // look up the user in the database
    const user = await User.findById(user_id);
    if (!user) {
      res.send("Could not find a user.")
    } else {
      try {
        const numWorkouts = await Workout.countDocuments({_id: user._id});
        const workouts = await Workout.find({
          _id: user._id,
          date: {
            $gte: from,
            $lte: to
          },
        }).limit(limit);
        const log = workouts.map(workout => ({
          description: workout.description,
          duration: workout.duration,
          date: workout.date.toDateString()
        }));
        console.log(workouts);
        console.log(log);
        res.json({
          username: user.username,
          count: numWorkouts,
          _id: user._id,
          log: log
        });
      } catch (err) {
        console.log(err);
        res.send(`There was an error that occurred while looking up the workouts: ${err}`);
      }
      
    }
  } catch (err) {
    console.log(err)
  }
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
});
