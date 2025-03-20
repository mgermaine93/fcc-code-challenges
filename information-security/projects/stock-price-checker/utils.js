'use strict';

const bcrypt = require('bcrypt');

const { MongoClient } = require("mongodb")
const MONGO_URL= process.env.MONGO_URL;
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

// set up the mongo DB connection
const client = new MongoClient(MONGO_URL);
const database = client.db("stock-price-checker");
const stocks = database.collection("stocks");

const Stock = require("./models").Stock;

const price = async function(url) {
  if (!url) {
    return { error: 'error in the price function' }; // Return an error object
  }
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const json = await response.json();
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
    if (!likedIPs) {
        return false
    }
    for (const storedHash of likedIPs) {
        if (await bcrypt.compare(ip, storedHash)) {
            return true;
        }
    }
    return false;
};

const stringToBool = (str) => str === 'true';

async function addStock(stockSymbol, stockPrice, like, hash) {

    // Create a new stock with likes based on the 'like' argument
    const newStock = new Stock({
        stock: stockSymbol,
        price: stockPrice,
        likes: like ? [hash] : [] // or null if no likes
    });

    // Save the stock document to the database
    try {
        const savedStock = await stocks.insertOne(newStock);
        return newStock;  // Return the saved document
    } catch (error) {
        console.error("Error saving stock:", error);
        throw new Error('Could not save the stock to the database');
    }
}

module.exports = { 
    addStock, 
    price, 
    hashedIp, 
    hasLikedBefore, 
    stringToBool
};
