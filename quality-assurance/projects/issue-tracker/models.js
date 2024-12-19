const mongoose = require('mongoose');
const { MongoClient, ObjectId } = require("mongodb")
const MONGO_URL= process.env.MONGO_URL;
// const { MongoClient } = require('mongodb');

// set up the mongo DB connection
const client = new MongoClient(MONGO_URL);
const database = client.db("issue-tracker");
const issues = database.collection("issues");
const projects = database.collection("projects");

// define the schema
const Schema = mongoose.Schema;

const currentDate = new Date()

const issueSchema = new Schema({
  issue_title: {
    type: String,
    required: true
  },
  issue_text: {
    type: String,
    required: true
  },
  created_by: {
    type: String,
    required: true
  },
  assigned_to: {
    type: String,
    required: false
  },
  status_text: {
    type: String,
    required: false
  },
  open: {
    type: Boolean,
    required: false,
    default: true
  },
  created_on: {
    type: Date,
    required: false,
    default: currentDate
  },
  updated_on: {
    type: Date,
    required: false,
    default: currentDate
  },
  project_id: {
    type: String,
    required: true
  }
});

// compile model from schema
const Issue = mongoose.model("Issue", issueSchema, "issues");

const projectSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

// compile model from schema
const Project = mongoose.model("Project", projectSchema, "projects");

exports.Issue = Issue;
exports.Project = Project;