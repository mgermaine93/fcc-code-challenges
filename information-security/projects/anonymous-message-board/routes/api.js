'use strict';

const express = require('express');
const app = express();

const MONGO_URL = process.env.MONGO_URL;
// const BASE_URL = process.env.BASE_URL;

// set up the mongo DB connection
const { MongoClient } = require("mongodb");
const client = new MongoClient(MONGO_URL);
const database = client.db("anonymous-message-board");
const replies = database.collection("replies");
const threads = database.collection("threads");
const boards = database.collection("boards");

const { 
  Reply,
  Thread,
  Board
} = require("../models");

const { 
  isPasswordCorrect,
  addBoard,
  addThread,
  addReply
} = require("../utils");

// board -> thread -> reply

module.exports = function (app) {
  
  app.route('/api/threads/:board')

    .get(async (req, res) => {
      // TBD
    })

    .post(async (req, res) => {

      console.log(req.body);
      const userBoardName = req.body.board || req.params.board || '';
      const userThreadText = req.body.text || '';
      const userDeletePassword = req.body.delete_password || '';

      if (!userBoardName) {
        return res.error({error: 'a thread must have a board'});
      }

      // need to get the board first, I think?
      let board = await boards.findOne({name: userBoardName});

      if (!board) {

        console.log('could not find the board in question');
        console.log('creating board...');

        // here's the board we save the thread to
        board = await addBoard(userBoardName);
        
        const newThread = await addThreadToBoard(userThreadText, userDeletePassword, board._id)

        return res.json(newThread)

      } else {

        // a board already exists, so add the thread to the board
        const newThread = await addThread(userThreadText, userDeletePassword, board._id);

        try {
          const updatedBoard = boards.findOneAndUpdate(
            {name: board.name}, // the stock to look up
            {$push: {
              threads: newThread
            }},
            {new: true} // return
          )
          return res.json(updatedBoard)
        } catch (err) {
          return res.json({error: `could not add the thread to the existing board: ${err}`});
        }

      }

    })

    .put(async (req, res) => {
      // TBD
    })

    .delete(async (req, res) => {

      const threadIdToDelete = req.body._id || '';
      const deletePassword = req.body._id || '';

      if (!threadIdToDelete) {
        return res.json({
          error: 'missing _id'
        });
      }

      // still need to check if the password is valid and if it works
      // TBD
      const threadToDelete = await threads.findOne({_id: threadIdToDelete});
      if (!threadToDelete) {
        return res.json({
          error: 'could not find the thread to delete'
        })
      }

      const checkedPassword = isPasswordCorrect(deletePassword, threadToDelete.delete_password)
      if (isPasswordCorrect) {
        
        try {

          const deletedThreadReplies = await replies.deleteMany({thread_id: threadIdToDelete});
          if (!deletedThreadReplies) {
            return res.json({
              error: 'could not delete the replies in the thread'
            });
          }

          const deletedThread = await threads.findOneAndDelete({_id: threadIdToDelete});
          if (!deletedThread) {
            return res.json({
              error: 'could not delete the thread'
            });
          }

          return res.send('success');

        } catch (err) {
          res.json({
            error: `something went wrong with deleting the thread and its replies: ${err}`
          })
        }

      } else {

        return res.send('wrong password')

      }

    })
    
  app.route('/api/replies/:board')

    .get(async (req, res) => {
      // TBD
    })

    .post(async (req, res) => {
      
      console.log(req.body);
      const userBoardName = req.body.board || req.params.board || '';
      const userThreadId = req.body.thread_id || '';
      const userReplyText = req.body.text || '';
      const userDeletePassword = req.body.delete_password || '';

      if (!userBoardName) {
        return res.error({error: 'a reply to a thread must have a board'});
      }

      // need to get the board first, I think?
      let board = await boards.findOne({name: userBoardName});

      if (!board) {
        res.json({
          error: `board does not exist: ${userBoardName}`
        })
      }

      // need to get the board first, I think?
      let thread = await threads.findOne({_id: userThreadId});

      if (!thread) {
        res.json({
          error: `thread does not exist: ${userThreadId}`
        })
      }

      const newReply = addReply(userReplyText, userDeletePassword, userThreadId)

      if (!newReply) {
        res.json({
          error: `unable to add reply and updated thread: ${newReply}`
        })
      }

    })

    .put(async (req, res) => {
      // TBD
    })

    .delete(async (req, res) => {
      // TBD
    })

};