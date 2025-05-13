'use strict';

const express = require('express');
const app = express();

const MONGO_URL = process.env.MONGO_URL;
// const BASE_URL = process.env.BASE_URL;

// set up the mongo DB connection
const { MongoClient, ObjectId } = require("mongodb");
const client = new MongoClient(MONGO_URL);
const database = client.db("anonymous-message-board");
const threads = database.collection("threads");

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

      console.log("In the GET route for /api/threads/:board!")

      const board = req.params.board || '';
      if (!board) {
        return res.json({
          message: "missing required field board"
        })
      }

      try {

        let recentThreads = await threads
          .find({ board: board })
          .sort({ bumped_on: -1 })
          .limit(10)
          .project({ delete_password: 0, reported: 0 })
          .toArray();

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

      console.log("In the POST route for /api/threads/:board!")

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

      console.log("In the PUT route for /api/threads/:board!")

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

      console.log("In the DELETE route for /api/threads/:board!")
      
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
            
      try {

        const thread = await threads.findOne({
          _id: new ObjectId(threadId)
        })

        if (thread.delete_password !== password) {
          console.log("incorrect password")
          return res.send("incorrect password");
        }

        const deletedThread = await threads.findOneAndDelete(thread)

        if (!deletedThread) {
          console.log("trouble with deleting the thread")
          res.send("could not delete the thread")
        }

        res.send("success")

      } catch (e) {
        res.send(`error with finding the thread: ${e}`)
      }
      
    })

    
  app.route('/api/replies/:board')

    .get(async (req, res) => {

      console.log("In the GET route for /api/replies/:board!")

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

      const thread = await threads.findOne({
        board: board,
        _id: new ObjectId(threadId)
      })

      if (!thread) {
        return res.json({
          error: "no thread exists with this name"
        })
      } else {

        const cleanedReplies = thread.replies.map(({ text, created_on, reported, _id }) => ({ 
          text, 
          created_on, 
          _id 
        }))

        const {
          _id,
          text,
          created_on,
          bumped_on,
          board
        } = thread;

        const cleanedThread = {
          _id,
          text,
          created_on,
          bumped_on,
          board,
          replies: cleanedReplies
        }

        return res.send(cleanedThread)

      }

    })

    .post(async (req, res) => {
      
      console.log("In the POST route for /api/replies/:board!")

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
        return res.redirect(`/b/${board}`);

      } catch (e) {
        return res.send(e)
      }

    })

    .put(async (req, res) => {

      console.log("In the PUT route for /api/replies/:board!")
      
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
      
      try {

        const thread = await threads.findOneAndUpdate(
          {
            _id: new ObjectId(threadId),
            "replies._id": new ObjectId(replyId)
          },
          {
            $set: {
              "replies.$.reported": true
            }
          },
          {
            returnDocument: "after"
          }
        )

        if (!thread) {
          return res.send('could not find the thread or reply')
        }

        const updatedReply = thread.replies.find(r => r._id.toString() === replyId)

        if (updatedReply.reported !== true) {
          return res.send('could not report the reply')
        } 

        return res.send("reported")

      } catch (e) {
        return res.send(`error with reporting the reply: ${e}`)
      }

    })

    .delete(async (req, res) => {

      console.log("In the DELETE route for /api/replies/:board!")
      
      const board = req.body.board || req.params.board || '';
      const threadId = req.body.thread_id || '';
      const replyId = req.body.reply_id || '';
      const password = req.body.delete_password || '';

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
      
      try {

        const thread = await threads.findOne({
          _id: new ObjectId(threadId)
        })

        const reply = thread.replies.find(r => r._id.equals(replyId));

        if (!reply) {
          return res.send("could not find a reply with that id")
        }

        if (reply.delete_password !== password) {
          return res.send("incorrect password");
        }

        const deletedReply = await threads.findOneAndUpdate(
          { _id: new ObjectId(threadId), "replies._id": new ObjectId(replyId) },
          { $set: { "replies.$.text": "[deleted]" } },
          { new: true }
        )

        if (!deletedReply) {
          res.send(`could not delete the reply`)
        }

        res.send("success")

      } catch (e) {
        res.send(`error with finding the reply: ${e}`)
      }

    })

}