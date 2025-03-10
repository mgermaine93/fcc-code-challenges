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

    // get all books by visiting the url /api/books
    .get(async (req, res) => {
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      try {
        const allBooks = await books.find().toArray();
        const booksWithCommentCount = [];
        // doing it this way allows async/await to work properly
        for (const book of allBooks) {
          const commentCount = await comments.countDocuments({book_id: book._id});
          book["commentcount"] = commentCount;
          booksWithCommentCount.push(book);
        }
        res.send(booksWithCommentCount);
        return;
      } catch (e) {
        res.send(e);
        return;
      }
    })
    
    // register a new book to the DB (from the UI)
    .post(async (req, res) => {
      //response will contain new book object including at least _id and title
      let title = req.body.title || '';
      // let commentcount = 0;
      if (!title) {
        res.send("missing required field title");
        return;
      } else {
        const newBook = new Book({
          title: title
        });
        try {
          const savedBook = await books.insertOne(newBook);
          const bookId = savedBook.insertedId;
          const bookResult = await books.findOne({_id: bookId})
          res.send(bookResult);
          return;
        } catch (e) {
          res.json({
            error: e
          });
          return;
        }
      }
    })
    
    // delete all books in the DB (from the UI)
    .delete(async (req, res) => {
      // if successful response will be 'complete delete successful'
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

    // retrieve a single object of a book (using the URL)
    .get(async (req, res) => {
      const bookId = req.params.id || '';
      if (!bookId) {
        res.send("missing required field id");
      } else {
        const bookObjectId = new ObjectId(bookId);
        const book = await books.findOne({_id: bookObjectId});
        if (!book) {
          res.send("no book exists");
          return;
        } else {
          const bookComments = await comments.find(
            {book_id: bookObjectId}, 
            {projection: {comment: 1, _id: 0}}
          ).toArray();
          if (!bookComments) {
            res.send("no comments found");
            return;
          } else {
            const commentsText = bookComments.map(comment => comment.comment);
            book["comments"] = commentsText;
            res.send(book);
            return;
          }
        }
      }
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    // add a comment to a book (using the UI)
    .post(async (req, res) => {
      let bookId = req.params.id || '';
      let comment = req.body.comment || '';
      // json res format same as .get
      if (!bookId) {
        res.send("missing required field title");
        return;
      } else if (!comment) {
        res.send("missing required field comment");
        return;
      } else {
        const bookObjectId = new ObjectId(bookId)
        const book = await books.findOne({_id: bookObjectId});
        if (!book) {
          res.send("no book exists");
          return;
        } else {
          const newComment = new Comment({
            comment: comment,
            book_id: bookObjectId
          });
          try {
            const savedComment = await comments.insertOne(newComment);
            if (!savedComment) {
              res.send("could not save the comment");
              return;
            } else {
              // 1 means include only that field, 0 (next to _id) means exclude everything else
              const bookComments = await comments.find(
                {book_id: bookObjectId}, 
                {projection: {comment: 1, _id: 0}}
              ).toArray();
              if (!bookComments) {
                res.send("no comments found");
                return;
              } else {
                const commentsText = bookComments.map(comment => comment.comment);
                book["comments"] = commentsText
                res.send(book);
                return;
              }
            }
          } catch (e) {
            res.send(e);
            return;
          }
        }
      }
    })
    
    // delete a single book (and its comments?) using the UI
    .delete(async (req, res) => {
      let bookId = req.params.id || '';
      if (!bookId) {
        res.send("missing required field id")
      } else {
        try {
          const deletedBook = await books.findOneAndDelete({_id: new ObjectId(bookId)});
          if (!deletedBook) {
            res.send("no book exists");
            return;
          } else {
            res.send("delete successful");
            return;
          }
        } catch (e) {
          res.send(e);
          return;
        }
      }
      // if successful response will be 'delete successful'
    });
  
};