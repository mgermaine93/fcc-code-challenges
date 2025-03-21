const mongoose = require('mongoose');

// define the schema
const Schema = mongoose.Schema;

const date = new Date();

const replySchema = new Schema({
  text: {
    type: String,
    required: true
  },
  delete_password: {
    type: String
  },
  created_on: {
    type: Date,
    default: date
  },
//   bumped_on: {
//     type: Date,
//     default: date
//   },
  reported: {
    type: Boolean,
    default: false
  }
});

// compile model from schema
const Reply = mongoose.model("Reply", replySchema, "replies");

const threadSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  delete_password: {
    type: String,
    required: true
  },
  reported: {
    type: Boolean,
    default: false
  },
  created_on: {
    type: Date,
    default: date
  },
  bumped_on: {
    type: Date,
    default: date
  },
  replies: {
    type: [replySchema]
  }
});

// compile model from schema
const Thread = mongoose.model("Thread", threadSchema, "threads");

const boardSchema = new Schema({
  name: {},
  threads: {
    type: [threadSchema]
  }
});

// compile model from schema
const Board = mongoose.model("Board", boardSchema, "boards");

module.exports = { 
    Reply,
    Thread,
    Board 
};