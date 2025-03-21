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
} = require("./models");

const isPasswordCorrect = async (password, password_to_check) => {
    if (!password) {
        return false
    }
    if (await bcrypt.compare(password, password_to_check)) {
        return true;
    }
    return false;
};

async function addBoard(boardName) {

    // Create a new board with likes based on the 'like' argument
    const newBoard = new Board({
        name: boardName
    });

    // Save the board document to the database
    try {
        const savedBoard = await boards.insertOne(newBoard);
        return savedBoard;  // Return the saved document
    } catch (error) {
        console.error("Error saving board:", error);
        throw new Error('Could not save the board to the database');
    }
}

async function addThread(threadText, deletePassword, boardId) {

    // Create a new thread with likes based on the 'like' argument
    const newThread = new Thread({
        text: threadText,
        delete_password: deletePassword,
        board_id: boardId
    });

    // Save the thread document to the database
    try {
        const savedThread = await threads.insertOne(newThread);
        return savedThread;  // Return the saved document
    } catch (error) {
        console.error("Error saving thread:", error);
        throw new Error('Could not save the thread to the database');
    }
}

async function addReply(replyText, deletePassword, threadId) {

    const date = new Date();

    // Create a new reply with likes based on the 'like' argument
    const newReply = new Reply({
        text: replyText,
        delete_password: deletePassword,
        thread_id: threadId,
    });

    // Save the reply document to the database
    try {
        const savedReply = await replies.insertOne(newReply);
        const threadToUpdate = threads.findOneAndUpdate(
            {_id: threadId}, // the stock to look up
            {$push: {
                bumped_on: date
            }},
            {new: true} // return
        )
        return savedReply;  // Return the saved document
    } catch (error) {
        console.error("Error saving reply:", error);
        throw new Error('Could not save the reply to the database');
    }
}

module.exports = { 
    isPasswordCorrect,
    addBoard,
    addThread,
    addReply
};