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
    default: ''
  },
  status_text: {
    type: String,
    default: ''
  },
  created_on: {
    type: Date,
    default: Date.now()
  },
  updated_on: {
    type: Date,
    default: Date.now()
  },
  open: {
    type: Boolean,
    default: true
  },
  project_id: {
    type: String,
    default: ''
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