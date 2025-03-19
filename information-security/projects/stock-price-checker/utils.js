'use strict';

const bcrypt = require('bcrypt');
const express = require('express');
const app = express();

const { MongoClient } = require("mongodb")
const MONGO_URL= process.env.MONGO_URL;
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

// set up the mongo DB connection
const client = new MongoClient(MONGO_URL);
const database = client.db("stock-price-checker");
const stocks = database.collection("stocks");
// const ips = database.collection("ips");

const Stock = require("./models").Stock;
// const addStock = require("../utils").addStock;

const price = async function(url) {

  if (!url) {
    return { error: 'error in the price function' }; // Return an error object
  }

  console.log(url);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    return json; // Return the data instead of just logging it
  } catch (error) {
    console.error("Error fetching data:", error);
    return { error: 'Failed to fetch price data' };
  }

};

const hashedIp = async (ip) => {
  try {
    return await bcrypt.hash(ip, SALT_ROUNDS);
  } catch (err) {
    console.error(`Error hashing IP address: ${err}`);
    throw new Error('Failed to hash IP address');
  }
}

const hasLikedBefore = async (ip, likedIPs) => {
    for (const storedHash of likedIPs) {
        if (await bcrypt.compare(ip, storedHash)) {
            return true;
        }
    }
    return false;
};

const stringToBool = (str) => str === 'true';

async function addStock(stockSymbol, stockPrice, like, hash) {
    console.log("Creating stock...");

    // Create a new stock with likes based on the 'like' argument
    const newStock = new Stock({
        stock: stockSymbol,
        price: stockPrice,
        likes: like ? [hash] : [] // or null if no likes
    });

    // Save the stock document to the database
    try {
        const savedStock = await stocks.insertOne(newStock);
        
        console.log("Stock saved:", savedStock);
        return newStock;  // Return the saved document
    } catch (error) {
        console.error("Error saving stock:", error);
        throw new Error('Could not save the stock to the database');
    }
}

// exports.addStock = addStock;
// exports.price = price;
// exports.hashedIp = hashedIp;
// exports.hasLikedBefore = hasLikedBefore;
// exports.stringToBool = stringToBool;

module.exports = { 
    addStock, 
    price, 
    hashedIp, 
    hasLikedBefore, 
    stringToBool
};
