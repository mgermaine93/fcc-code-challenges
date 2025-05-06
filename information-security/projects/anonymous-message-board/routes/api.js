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
  Thread,
  Board
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

      const board = req.params.board || '';
      if (!board) {
        return res.json({
          message: "missing required field board"
        })
      }

      const retrievedBoard = await boards.findOne({name: board});
      if (!retrievedBoard) {
        return res.json({
          error: "no board exists with this name"
        })
      }
      else {

        const justThreads = retrievedBoard.threads
        const sortedThreads = justThreads.sort((a, b) => b.bumped_on - a.bumped_on)
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
        return res.json(threadsWithThreeMostRecentReplies)
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
      } else {

        const newThread = new Thread({
          text: boardText,
          delete_password: passwordToDelete,
          replies: []
        })

        // first, try to find the board
        try {
          const foundBoard = await boards.findOne({ name: board });
          if (!foundBoard) {
            // if there isn't already a board, add it and its thread
            const newBoard = await handleNewBoard(board, newThread, boards, res)
            return newBoard
          } else {
            const updatedBoard = await handleExistingBoard(foundBoard, newThread, boards, res)
            return updatedBoard
          }
        } catch (e) {
          return res.json({
            error: e
          })
        }
      }
    })

    .put(async (req, res) => {
      const board = req.params.board || '';
      const threadId = req.body.thread_id || '';

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
      
      // find the thread
      try {
        await boards.updateOne(
            // filter first to find the correct board, then by the correct thread
            {
                name: board,
                'threads._id': new ObjectId(String(threadId))
            },
            { 
                $set: {
                    'threads.$.reported': true
                }
            }
        )
        return res.send("reported")
      } catch (e) {
          console.error("could not update the thread", e);
          return res.json({ error: e })
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
      else {

        console.log("In the thread delete else block")
        
        try {
          const result = await boards.updateOne(
            { 
              name: board,
              threads: {
                $elemMatch: {
                  _id: new ObjectId(threadId),
                  delete_password: password
                }
              }
            },
            { 
              $pull: { 
                threads: { _id: new ObjectId(threadId) } 
              } 
            }
          )

          console.log(result)

          if (result.modifiedCount === 0) {
            return res.send("incorrect password")
          }

          return res.send("success")

        } catch (e) {
          console.log(e)
          return res.json({
            message: "error deleting the thread"
          })
        }
        
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

      try {

        // retrieve the board's entire thread with all of its replies
        const boardThread = await boards.findOne(
          {
            name: board,
            'threads._id': new ObjectId(String(threadId))
          }
        )

        if (!boardThread) {
          return res.json({
            error: "could not find the thread in that board"
          })
        }
        else {

          // assumes that the thread is there, which should be safe to do since it was found in the result above
          const justTheThread = boardThread.threads.find(
            t => t._id.toString() === threadId
          )

          const { delete_password, reported, replies, ...safeThread } = justTheThread
          
          const safeReplies = replies.map(({ delete_password, reported, ...safeReply }) => safeReply)

          safeThread.replies = safeReplies
          
          return res.json(safeThread)
          
        }
      } catch (e) {
        return res.json({
          error: e
        })
      }

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
      else {

        const newReply = new Reply({
          text: replyText,
          delete_password: passwordToDelete,
        })

        const foundBoard = await boards.findOne({ name: board })
        if (!foundBoard) {
          return res.json({
            error: 'could not find the board'
          })
        } else {

          const foundThread = foundBoard.threads.find(
            thread => thread._id.toString() === threadId
          )
          if (!foundThread) {
            return res.json({
              error: 'could not find the thread'
            })
          } else {
            return await addReplyToThread(foundBoard.name, threadId, newReply, boards, res)
          }

        }
        
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
      
      try {
        await boards.updateOne(
          // filter first to find the correct board, then by the correct thread
          {
              name: board,
              'threads._id': new ObjectId(threadId),
              "threads.replies._id": new ObjectId(replyId)
          },
          { 
              $set: {
                  'threads.$[thread].replies.$[reply].reported': true
              }
          },
          {
            arrayFilters: [
                { "thread._id": new ObjectId(threadId) },
                { "reply._id": new ObjectId(replyId) }
              ]
          }
        )
        return res.send("reported")
      } catch (e) {
          console.error("could not update the reply", e);
          return res.json({ error: e })
      }

    })

    .delete(async (req, res) => {

      console.log(`-------------------------------------------- in the reply delete route ---------------------------------------------`)
      
      const board = req.body.board || '';
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
      else {
        
        const foundBoard = await boards.findOne({name: board})
        if (!foundBoard) {
          return res.json({
            message: "could not find the board"
          })
        }
        else {

          const thread = board.threads.id(threadId)
          if (!thread) {
            return res.json({
              message: "could not find the thread"
            })
          }
          
          const reply = thread.replies.id(replyId)
          if (!reply) {
            return res.json({
              message: "could not find the reply"
            })
          }
          if (reply.delete_password !== password) {
            return res.send("incorrect password")
          }

          try {
            await boards.updateOne(
              {
                name: board,
                "threads._id": ObjectId(threadId),
                "threads.replies._id": ObjectId(replyId)
              },
              { 
                $set: { 
                  "threads.$[t].replies.$[r].text": "[deleted]"
                }
              }
            )
          } catch (e) {
            return res.send("success")
          }
          
        }

      }

    })

};