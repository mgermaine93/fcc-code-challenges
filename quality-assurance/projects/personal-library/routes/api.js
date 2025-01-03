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
      // try to find a project to save the issue into
      
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
    });



  app.route('/api/books/:id')
    .get(async (req, res) => {
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(async (req, res) => {
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
    })
    
    .delete(async (req, res) => {
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
  
};