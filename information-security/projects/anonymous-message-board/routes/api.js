'use strict';

const express = require('express');
const app = express();

const MONGO_URL = process.env.MONGO_URL;
// const BASE_URL = process.env.BASE_URL;

// set up the mongo DB connection
const { MongoClient, ObjectId } = require("mongodb");
const client = new MongoClient(MONGO_URL);
const database = client.db("anonymous-message-board");
const replies = database.collection("replies");
const threads = database.collection("threads");
const boards = database.collection("boards");

const { 
  Reply,
  Thread
} = require("../models");

const { 
  isPasswordCorrect,
  handleNewBoard,
  handleExistingBoard,
  addThread,
  addReplyToThread
} = require("../utils");

// board -> thread -> reply

module.exports = function (app) {
  
  app.route('/api/threads/:board')

    .get(async (req, res) => {

      console.log("In the get route for board threads!")

      const board = req.params.board || '';
      if (!board) {
        return res.json({
          message: "missing required field board"
        })
      }

      console.log(board)

      try {

        let recentThreads = await threads
          .find({ board: board })
          .sort({ bumped_on: -1 })
          .limit(10)
          .project({ delete_password: 0, reported: 0 })
          .toArray();

        console.log(recentThreads)

        recentThreads.forEach(thread => {
          thread.replies = (thread.replies || [])
            // sort by most recent replies
            .sort((a, b) => new Date(b.created_on) - new Date(a.created_on))
            .slice(0, 3)
            .map(reply => {
              const { delete_password, reported, ...safeReply } = reply;
              return safeReply
            })
        })

        return res.send(recentThreads)

      } catch (e) {
        return res.send(`error with retrieving the 10 most recent threads of a board: ${e}`)
      }

    })

    .post(async (req, res) => {

      console.log("In the /api/threads/:board POST route")

      let board = req.body.board || '';
      if (!board) {
        board = req.params.board;
      }
      const boardText = req.body.text || '';
      const passwordToDelete = req.body.delete_password || '';

      if (!board || !boardText || !passwordToDelete) {
        if (!board) {
          return res.json({
            message: "missing required field 'board'"
          })
        }
        if (!boardText) {
          return res.json({
            message: "missing required field 'text'"
          })
        }
        if (!passwordToDelete) {
          return res.json({
            message: "missing required field 'delete_password'"
          })
        }
      }

      // TBD
      const newThread = new Thread({
        board: board,
        text: boardText,
        delete_password: passwordToDelete
      })

      try {
        const savedThread = await threads.insertOne(newThread)
        if (!savedThread) {
          return res.json({
            error: "error creating a thread"
          })
        } else {
          return res.send(savedThread)
        }
      } catch (e) {
        return res.json({
          error: "error saving a thread"
        })
      }

    })

    .put(async (req, res) => {

      const board = req.params.board || '';
      const threadId = req.body.thread_id || '';

      console.log(threadId)

      if (!board) {
        return res.json({
          message: "missing required field board"
        })
      }
      if (!threadId) {
        return res.json({
          message: "missing required field thread_id"
        })
      }
      
      // TBD
      try {

        const reportedThread = await threads.findOneAndUpdate(
          {
            _id: new ObjectId(threadId)
          },
          {
            $set: {
              bumped_on: Date.now(),
              reported: true
            }
          },
          { new: true}
        )
        return res.send("reported")

      } catch (e) {
        return res.send(`error with reporting a thread: ${e}`)
      }

    })

    .delete(async (req, res) => {

      console.log(`-------------------------------------------- in the thread delete route ---------------------------------------------`)
      
      const board = req.params.board || '';
      const threadId = req.body.thread_id || '';
      const password = req.body.delete_password || '';

      if (!board || !threadId || !password) {
        if (!board) {
          return res.json({
            message: "missing required field 'board'"
          })
        }
        if (!threadId) {
          return res.json({
            message: "missing required field 'thread_id'"
          })
        }
        if (!password) {
          return res.json({
            message: "missing required field 'delete_password'"
          })
        }
      }
      
      // TBD
      
      try {

        const thread = await threads.findOne({
          _id: new ObjectId(threadId)
        })

        console.log(JSON.stringify(thread))

        if (thread.delete_password !== password) {
          console.log("incorrect password")
          return res.send("incorrect password");
        }

        const deletedThread = await threads.findOneAndDelete(thread)

        if (!deletedThread) {
          console.log("trouble with deleting the thread")
          res.send(`error with deleting the thread: ${e}`)
        }

        console.log("success")
        res.send("success")

      } catch (e) {
        res.send(`error with finding the thread: ${e}`)
      }
      
    })

    
  app.route('/api/replies/:board')

    .get(async (req, res) => {

      const board = req.params.board || '';
      const threadId = req.query.thread_id || '';

      if (!board) {
        return res.json({
          message: "missing required field board"
        })
      }
      if (!threadId) {
        return res.json({
          message: "missing required field thread_id"
        })
      }

      const threadReplies = await threads.find({board: board, _id: new ObjectId(threadId)}).toArray();

      console.log(threadReplies)
      if (!threadReplies) {
        return res.json({
          error: "no thread exists with this name"
        })
      } else {
        return res.json(threadReplies)
      }

      // TBD

    })

    .post(async (req, res) => {
      
      console.log("In the /api/replies/:board POST route")

      let board = req.body.board || '';
      if (!board) {
        board = req.params.board;
      }
      const threadId = req.body.thread_id || '';
      const replyText = req.body.text || '';
      const passwordToDelete = req.body.delete_password || '';

      if (!ObjectId.isValid(threadId)) {
        return res.json({
          error: 'invalid thread_id'
        })
      }

      if (!board || !threadId || !replyText || !passwordToDelete) {
        if (!board) {
          return res.json({
            message: "missing required field 'board'"
          })
        }
        if (!threadId) {
          return res.json({
            message: "missing required field 'thread_id'"
          })
        }
        if (!replyText) {
          return res.json({
            message: "missing required field 'text'"
          })
        }
        if (!passwordToDelete) {
          return res.json({
            message: "missing required field 'delete_password'"
          })
        }
      }
      
      // create the reply
      const newReply = new Reply({
        text: replyText,
        delete_password: passwordToDelete
      })

      // try to update the thread
      try {
        const updatedThread = await threads.findOneAndUpdate(
          {
            _id: new ObjectId(threadId)
          },
          {
            $push: {replies: newReply},
            $set: {bumped_on: newReply.created_on}
          },
          { new: true}
        )
        return res.send(updatedThread)
      } catch (e) {
        return res.send(e)
      }

    })

    .put(async (req, res) => {
      
      const board = req.params.board || '';
      const threadId = req.body.thread_id || '';
      const replyId = req.body.reply_id || '';

      if (!board) {
        return res.json({
          message: "missing required field board"
        })
      }
      if (!threadId) {
        return res.json({
          message: "missing required field thread_id"
        })
      }
      if (!replyId) {
        return res.json({
          message: "missing required field reply_id"
        })
      }
      
      // TBD

    })

    .delete(async (req, res) => {

      console.log(`-------------------------------------------- in the reply delete route ---------------------------------------------`)
      
      const board = req.body.board || req.params.board || '';
      const threadId = req.body.thread_id || '';
      const replyId = req.body.reply_id || '';
      const password = req.body.delete_password || '';

      console.log(`${board}, ${threadId}, ${replyId}, ${password}`)

      if (!board || !threadId || !replyId || !password) {
        if (!board) {
          return res.json({
            message: "missing required field 'board'"
          })
        }
        if (!threadId) {
          return res.json({
            message: "missing required field 'thread_id'"
          })
        }
        if (!replyId) {
          return res.json({
            message: "missing required field 'reply_id'"
          })
        }
        if (!password) {
          return res.json({
            message: "missing required field 'delete_password'"
          })
        }
      }
      
      // TBD

      try {

        const thread = await threads.findOne({
          _id: new ObjectId(threadId)
        })

        console.log(JSON.stringify(thread))

        const reply = thread.replies.find(r => r._id.equals(replyId));

        console.log(JSON.stringify(reply))

        if (!reply) {
          return res.send("could not find a reply with that id")
        }

        if (reply.delete_password !== password) {
          console.log("incorrect password")
          return res.send("incorrect password");
        }

        const deletedReply = await threads.findOneAndUpdate(
          { _id: new ObjectId(threadId), "replies._id": new ObjectId(replyId) },
          { $set: { "replies.$.text": "[deleted]" } },
          { new: true }
        )

        if (!deletedReply) {
          console.log("trouble with deleting the reply")
          res.send(`error with deleting the reply: ${e}`)
        }

        console.log("success")
        res.send("success")

      } catch (e) {
        res.send(`error with finding the reply: ${e}`)
      }

    })

};