/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const mongoose = require('mongoose');
const { MongoClient, ObjectId } = require("mongodb")
const MONGO_URL= process.env.DB;
// const { MongoClient } = require('mongodb');

// set up the mongo DB connection
const client = new MongoClient(MONGO_URL);
const database = client.db("personal-library");
const books = database.collection("books");
const comments = database.collection("comments");

const Book = require("../models").Book;
const Comment = require("../models").Comment;

module.exports = function (app) {

  app.route('/api/books')
    .get(async (req, res) => {
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      
    })
    
    .post(async (req, res) => {
      //response will contain new book object including at least _id and title
      let title = req.body.title || '';
      if (!title) {
        res.send("missing required field title");
        return;
      } else {
        const newBook = new Book({title: title});
        try {
          const savedBook = await books.insertOne(newBook);
          const bookId = savedBook.insertedId;
          const bookResult = await books.findOne({_id: bookId})
          res.json(bookResult);
          return;
        } catch (e) {
          res.json({
            error: e
          });
          return;
        }
      }
    })
    
    .delete(async (req, res) => {
      //if successful response will be 'complete delete successful'
      try {
        const deletedBooks = await books.deleteMany({});
        if (deletedBooks) {
          res.send("complete delete successful");
          return
        } else {
          res.send("complete delete not successful");
          return;
        }
      } catch (e) {
        res.send(e);
        return;
      }
    });


  app.route('/api/books/:id')
    .get(async (req, res) => {
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(async (req, res) => {
      let bookId = req.params.id || '';
      let comment = req.body.comment || '';
      //json res format same as .get
      if (!bookId) {
        res.send("missing required field title");
        return;
      } else if (!comment) {
        res.send("missing required field comment");
        return;
      } else {
        const book = await books.findOne({_id: new ObjectId(bookId)});
        if (!book) {
          res.send("no book exists");
          return;
        } else {
          console.log("book exists!")
          const newComment = new Comment({
            comment: comment,
            book_id: book._id
          });
          const savedComment = await comments.insertOne(newComment);
          const commentResult = await comments.find({book_id: new ObjectId(book._id)}).toArray();
          // console.log(book);
          res.json(commentResult);
          return;
        }
      }
    })
    
    .delete(async (req, res) => {
      let bookId = req.params.id || '';
      if (!bookId) {
        res.send("missing required field id")
      } else {
        try {
          const deletedBook = await books.deleteOne({_id: new ObjectId(bookId)});
          if (deletedBook) {
            res.send("delete successful");
            return;
          } else {
            res.send("no book exists");
            return;
          }
        } catch (e) {
          res.send(e);
          return;
        }
      }
      //if successful response will be 'delete successful'
    });
  
};