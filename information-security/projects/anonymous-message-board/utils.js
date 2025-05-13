const express = require('express');
const app = express();

const MONGO_URL = process.env.MONGO_URL;

// set up the mongo DB connection
const { MongoClient, ObjectId } = require("mongodb");
const client = new MongoClient(MONGO_URL);
const database = client.db("anonymous-message-board");
const threads = database.collection("threads");

const { 
  Thread
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


module.exports = isPasswordCorrect;