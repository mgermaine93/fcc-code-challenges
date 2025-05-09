const mongoose = require('mongoose');

// define the schema
const Schema = mongoose.Schema;

// const date = new Date();

const ReplySchema = new Schema({
  text: {
    type: String,
    required: true
  },
  created_on: {
    type: Date,
    default: Date.now()
  },
  delete_password: {
    type: String,
    required: true
  },
  reported: {
    type: Boolean,
    default: false
  }
});

// compile model from schema
const Reply = mongoose.model("Reply", ReplySchema, "replies");

const ThreadSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  created_on: {
    type: Date,
    default: Date.now()
  },
  bumped_on: {
    type: Date,
    default: Date.now()
  },
  reported: {
    type: Boolean,
    default: false
  },
  delete_password: {
    type: String,
    required: true
  },
  replies: {
    type: [ReplySchema]
  },
  board: {
    type: String,
    required: true
  }
});

// compile model from schema
const Thread = mongoose.model("Thread", ThreadSchema, "threads");

const boardSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  threads: {
    type: [ThreadSchema],
    required: true
  }
});

// compile model from schema
const Board = mongoose.model("Board", boardSchema, "boards");

module.exports = { 
    Reply,
    Thread,
    Board 
};