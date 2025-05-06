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

async function handleNewBoard(boardName, thread, boards, res) {

    // console.log("IN THE HANDLE NEW BOARD FUNCTION")
    // console.log(boardName)

    // Create a new board with likes based on the 'like' argument
    const newBoard = new Board({
        name: boardName,
        threads: [thread]
    });
    // console.log(`Here is the new board: ${newBoard}`)

    // Save the board document to the database
    try {
        const savedBoard = await boards.insertOne(newBoard);
        return res.json(thread)
    } catch (e) {
        console.error("Error saving board:", e);
        return res.json({ error: e })
    }
}

async function handleExistingBoard(board, thread, boards, res) {

    // console.log("IN THE HANDLE EXISTING BOARD FUNCTION")

    try {
        await boards.updateOne(
            // filter first to find the correct board
            { name: board._id },
            { $push: { threads: thread } }
        )
        // console.log(`Here is the thread: ${thread}`)
        return res.json(thread)
    } catch (e) {
        console.error("Error saving board:", e);
        return res.json({ error: e })
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

async function addReplyToThread(boardName, threadId, reply, boards, res) {
    // console.log(`${boardName}, ${threadId}, ${reply}`)
    // Save the reply document to the database
    try {
        await boards.updateOne(
            // filter first to find the correct board, then by the correct thread
            {
                name: boardName,
                'threads._id': new ObjectId(String(threadId))
            },
            { 
                $push: {
                    'threads.$.replies': reply
                },
                $set: {
                    'threads.$.bumped_on': reply.created_on
                }
            }
        )
        // console.log(`Here is the reply: ${reply}`)
        return res.json(reply)
    } catch (e) {
        // console.error("Error saving reply:", e);
        return res.json({ error: e })
    }
}

module.exports = { 
    isPasswordCorrect,
    handleNewBoard,
    handleExistingBoard,
    addThread,
    addReplyToThread
};