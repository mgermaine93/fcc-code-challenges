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

      const board = req.params.board || '';
      if (!board) {
        console.log("missing required field board")
        return res.send({
          message: "missing required field board"
        })
      }

      const retrievedBoard = await boards.findOne({name: board});
      if (!retrievedBoard) {
        console.log("no board exists with this name")
        return res.json({
          error: "no board exists with this name"
        })
      }
      else {
        console.log("board exists!")
        console.log(retrievedBoard)
        const justThreads = retrievedBoard.threads
        console.log(justThreads)
        const sortedThreads = justThreads.sort((a, b) => b.bumped_on - a.bumped_on)
        console.log(sortedThreads)
        const threadsWithThreeMostRecentReplies = sortedThreads.map((thread) => {
          const { delete_password, reported, replies, ...filteredThread } = thread;
          if (replies) {
            const sortedReplies = replies
              .sort((a, b) => b.created_on - a.created_on)
              .slice(0,3)
              .map(({ delete_password, reported, ...filteredReply}) => filteredReply)
            return {
              ...filteredThread,
              replies: sortedReplies
            }
          } else {
            return {
              ...filteredThread,
            }
          }
        })
        console.log(`updated threads: ${JSON.stringify(threadsWithThreeMostRecentReplies)}`)
        return res.json(threadsWithThreeMostRecentReplies)
      }

      // res.send({
      //   message: "In the /api/threads/:board GET route!"
      // })
    })

    .post(async (req, res) => {

      console.log(req.body)
      console.log(req.params)
      console.log(req.query)

      let board = req.body.board || '';
      if (!board) {
        board = req.params.board;
      }
      const boardText = req.body.text || '';
      const passwordToDelete = req.body.delete_password || '';

      if (!board || !boardText || !passwordToDelete) {
        if (!board) {
          return res.send({
            message: "missing required field board"
          })
        }
        if (!boardText) {
          return res.send({
            message: "missing required field text"
          })
        }
        if (!passwordToDelete) {
          return res.send({
            message: "missing required field password to delete"
          })
        }
      } else {

        const newThread = new Thread({
          board,
          text: boardText,
          delete_password: passwordToDelete,
        })

        // first, try to find the board
        const threadBoard = await boards.findOne({name: board});
        if (!threadBoard) {
          const newBoard = new Board({
            name: board,
            threads: [newThread]
          })
          try {
            await boards.insertOne(newBoard);
            // return res.json({ ...newThread, delete_password: undefined, reported: undefined });
            return res.json(newThread)
          } catch (e) {
            return res.send({
              error: e
            })
          }
        }
        // if there's already a board, update it
        else {
          try {
            await boards.updateOne(
              // filter first to find the correct board
              { name: threadBoard.name },
              { $push: { threads: newThread } }
            );
            // return res.json({ ...newThread, delete_password: undefined, reported: undefined });
            return res.json(newThread)
          } catch (e) {
            return res.send({
              error: e
            })
          }
        }
      }

      res.send({
        message: "In the /api/threads/:board POST route!"
      })
    })

    .put(async (req, res) => {
      console.log(req.body)
      console.log(req.params)
      res.send({
        message: "In the /api/threads/:board PUT route!"
      })
    })

    .delete(async (req, res) => {
      console.log("in the thread delete route")
      res.send({
        message: "In the /api/threads/:board DELETE route!"
      })

    })
    
  app.route('/api/replies/:board')

    .get(async (req, res) => {
      res.send({
        message: "In the /api/replies/:board GET route!"
      })
    })

    .post(async (req, res) => {
      res.send({
        message: "In the /api/replies/:board POST route!"
      })
    })

    .put(async (req, res) => {
      res.send({
        message: "In the /api/replies/:board PUT route!"
      })
    })

    .delete(async (req, res) => {
      res.send({
        message: "In the /api/replies/:board DELETE route!"
      })
    })

};