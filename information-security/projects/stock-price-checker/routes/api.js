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

const Stock = require("../models").Stock;
// const IP = require("../models").IP;


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


module.exports = (app) => {

  app.route('/api/stock-prices')

    .get(async (req, res) => {

      // get the user's IP
      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      const hash = await hashedIp(ip);

      const baseUrl = "https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/";

      const stockInput = req.query.stock || '';

      if (!stockInput) {
        return res.json({
          error: 'at least one stock symbol is required'
        })
      }

      else if (Array.isArray(stockInput) && stockInput.length == 2) {

        console.log({error: 'there are two stocks to search'})

        // there are two stocks to check
        const stock1 = String(req.query.stockInput[0]).trim().toUpperCase() || '';
        console.log(stock1);
        const dbStock1 = await stocks.findOne({stock: stock1});

        const stock2 = String(req.query.stockInput[1]).trim().toUpperCase() || '';
        console.log(stock2);
        const dbStock2 = await stocks.findOne({stock: stock2});

        const likeBoth = stringToBool(req.query.like) || false;
        console.log(like);

        const stockData1 = await price(`${baseUrl}${stock1}/quote`);
        console.log(stockData1);

        const stockData2 = await price(`${baseUrl}${stock1}/quote`);
        console.log(stockData2);

        if (!stockData1 || !stockData2) {
          return res.json({error: 'could not retrieve information about at least one of the stocks'});
        } else {

          const stock1Symbol = stockData1.symbol;
          const stock1Price = stockData1.latestPrice;

          const stock2Symbol = stockData2.symbol;
          const stock2Price = stockData2.latestPrice;

          return res.json({
            'stockData': [
              {
                'stock': stock1Symbol,
                'price': stock1Price,
                'rel_likes': dbStock1.likes.length
              },
              {
                'stock': stock2Symbol,
                'price': stock2Price,
                'rel_likes': dbStock2.likes.length
              },
            ]
          })
        }

      }

      else if (typeof stockInput === "string") {

        // there is one stock to check
        const stock = String(req.query.stock).trim().toUpperCase() || '';
        const like = stringToBool(req.query.like) || false;
        console.log(like)

        const stockData = await price(`${baseUrl}${stock}/quote`);

        if (!stockData) {
          return res.json({error: 'could not retrieve information about the stock'});
        } else {

          const stockSymbol = stockData.symbol;
          const stockPrice = stockData.latestPrice;
          const stock = await stocks.findOne({stock: stockSymbol});
          
          if (!stock) {

            console.log("Creating the stock")
            // if the stock isn't already in my database, create it and add it to the database
            const newStock = new Stock({
              stock: stockSymbol,
              price: stockPrice,
              likes: like ? [hash] : []
            });
              
            const savedStock = await stocks.insertOne(newStock);
            if (!savedStock) {
              return res.json({error: 'could not save the stock to the database'});
            } 
            console.log(savedStock)

            return res.json({
              stockData: {
                stock: savedStock.stock,
                price: savedStock.price,
                likes: savedStock.likes.length
              }
            })
          
          }

          else {

            // the stock is already in the database, so we'll need to check for likes
            const stockToReturn = await stocks.findOne({stock: stockSymbol});
            if (!stockToReturn) {
              return res.json({error: 'could not retrieve the stock from the database'});
            }
            
            // check to see if the stock is already in the IPs "likes"
            if (like && await hasLikedBefore(ip, stockToReturn.likes)) {
              console.log('The stock has already been liked by this IP address');
              return res.json({
                stockData: {
                  stock: stockToReturn.stock,
                  price: stockToReturn.price,
                  likes: stockToReturn.likes.length
                }
              })
            } else if (like) {
              const stockToUpdate = stocks.findOneAndUpdate(
                {stock: stockSymbol}, // the stock to look up
                {likes: stockToReturn.likes.push(hash)}, // the field to update
                {new: true} // return
              )
              if (!stockToUpdate) {
                return res.json({error: 'could not update the stock'});
              }
              return res.json({
                stockData: {
                  stock: stockToUpdate.stock,
                  price: stockToUpdate.price,
                  likes: stockToUpdate.likes.length
                }
              })

            } else {
              return res.json({
                stockData: {
                  stock: stockToReturn.stock,
                  price: stockToReturn.price,
                  likes: stockToReturn.likes.length
                }
              })
            }
            
          }

        }
      }

    });
    
};