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

module.exports = function (app) {
  
  app.route('/api/threads/:board')
    
    .get(async (req, res) => {
        console.log("In the /api/threads/:board GET route")
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
                // return newBoard
                
            } else {
                try {
                    const savedThread = await boards.updateOne(
                        // filter first to find the correct board
                        { name: board._id },
                        { $push: { threads: newThread } }
                    )
                    // console.log(`Here is the thread: ${thread}`)
                    return res.redirect('/b/' + board);
                } catch (e) {
                    console.error("Error saving board:", e);
                    return res.json({ error: e })
                }
            }
            } catch (e) {
            return res.json({
                error: e
            })
        }

        // try {
        //     const savedThread = await newThread.save();
        //     return res.redirect('/b/' + savedThread.board + '/' + savedThread.id);
        // } catch (error) {
        //     console.error("Error saving thread:", error);
        //     return res.status(500).send("Internal server error");
        // }
    })



    .put(async (req, res) => {
        console.log("In the /api/threads/:board PUT route")
    })

    .delete(async (req, res) => {
        console.log("In the /api/threads/:board DELETE route")
    })
    
  app.route('/api/replies/:board')
    
    .get(async (req, res) => {
        console.log("In the /api/replies/:board GET route")
    })

    .post(async (req, res) => {
        console.log("In the /api/replies/:board POST route")
    })

    .put(async (req, res) => {
        console.log("In the /api/replies/:board PUT route")
    })

    .delete(async (req, res) => {
        console.log("In the /api/replies/:board DELETE route")
    })

};