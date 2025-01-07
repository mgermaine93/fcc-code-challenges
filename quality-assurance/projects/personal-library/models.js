const mongoose = require('mongoose');
const { MongoClient, ObjectId } = require("mongodb")
const MONGO_URL = process.env.DB;
// const { MongoClient } = require('mongodb');

// set up the mongo DB connection
const client = new MongoClient(MONGO_URL);
const database = client.db("personal-library");
const books = database.collection("books");
const comments = database.collection("comments");

// define the schema
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true
  }
});

// compile model from schema
const Book = mongoose.model("Book", bookSchema, "books");

const commentSchema = new Schema({
  comment: {
    type: String,
    required: true
  },
  book_id: {
    type: ObjectId,
    required: true
  }
});

// compile model from schema
const Comment = mongoose.model("Comment", commentSchema, "comments");

exports.books = books;
exports.comments = comments;
exports.Book = Book;
exports.Comment = Comment;
