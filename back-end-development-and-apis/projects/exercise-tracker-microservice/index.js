const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');
const { MongoClient } = require("mongodb")
require('dotenv').config()

// middleware
app.use(cors())
app.use(express.static('public'))
app.use(express.json());
// this helps to get the body of any requests
app.use(express.urlencoded({ extended: true }))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

MONGO_URL= process.env.MONGO_URL;

// set up the mongo DB connection
const client = new MongoClient(MONGO_URL);
const database = client.db("exercise-tracker");
const usersCollection = database.collection("users");
const exerciseCollection = database.collection("workouts");

// define the base schema
const Schema = mongoose.Schema;

// the schema used for users
const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
});
// compile model from schema
const user = mongoose.model("user", userSchema);

// the schema users for workouts/exercises
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
const workout = mongoose.model("workout", workoutSchema);

// create a new user
app.post('/api/users', async function(req, res) {

  console.log("In the users POST request");
  
  // retrieve the user-input url
  const username = req.body.username;

  // construct the valid user
  const userDocument = {
    username: username
  }

  // save it to to the database
  const result = await usersCollection.insertOne(userDocument);

  // display the valid url to the user
  res.json({
    username: username
  });
});

// create an exercise for a user
app.post('/api/users/:_id/exercises', function(req, res) {

});

// get a list of users
app.get('/api/users', function(req, res) {

});

// get a list of a user's exercises
app.get('/api/users/:_id/logs', function(req, res) {

});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
});
