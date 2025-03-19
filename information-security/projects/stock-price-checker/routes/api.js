'use strict';

const express = require('express');
const app = express();

const { MongoClient } = require("mongodb")
const MONGO_URL= process.env.MONGO_URL;

// set up the mongo DB connection
const client = new MongoClient(MONGO_URL);
const database = client.db("stock-price-checker");
const stocks = database.collection("stocks");

const Stock = require("../models").Stock;

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

module.exports = (app) => {

  app.route('/api/stock-prices')

    .get(async (req, res) => {

      let baseUrl = "https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/";

      const stockInput = req.query.stock || '';

      if (!stockInput) {
        return res.json({
          error: 'at least one stock symbol is required'
        })
      }

      if (Array.isArray(stockInput) && stockInput.length == 2) {

        return res.json({error: 'there are two stocks to search'})

        // // there are two stocks to check
        // const stock1 = req.query.stockInput[0].trim().toUpperCase() || '';
        // console.log(stock1);
        // const dbStock1 = await stocks.findOne({stock: stock1});

        // const stock2 = req.query.stockInput[1].trim().toUpperCase() || '';
        // console.log(stock2);
        // const dbStock2 = await stocks.findOne({stock: stock2});

        // const like = req.query.like || false;
        // console.log(like);

        // const stockData1 = await price(`${baseUrl}${stock1}/quote`);
        // console.log(stockData1);

        // const stockData2 = await price(`${baseUrl}${stock1}/quote`);
        // console.log(stockData2);

        // if (!stockData1 || !stockData2) {
        //   return res.json({error: 'could not retrieve information about at least one of the stocks'});
        // } else {

        //   const stock1Symbol = stockData1.symbol;
        //   const stock1Price = stockData1.latestPrice;
        //   const stock1Likes = '' // TBD, need to do a DB for this I think

        //   const stock2Symbol = stockData2.symbol;
        //   const stock2Price = stockData2.latestPrice;
        //   const stock2Likes = '' // TBD, need to do a DB for this I think

        //   return res.json({
        //     'stockData': [
        //       {
        //         'stock': stock1Symbol,
        //         'price': stock1Price,
        //         'rel_likes': stock1Likes
        //       },
        //       {
        //         'stock': stock2Symbol,
        //         'price': stock2Price,
        //         'rel_likes': stock2Likes
        //       },
        //     ]
        //   })
        // }

      }

      else if (typeof stockInput === "string") {

        // there is one stock to check
        const stock = req.query.stock.trim().toUpperCase() || '';
        const like = req.query.like || false;

        const stockData = await price(`${baseUrl}${stock}/quote`);
        
        if (!stockData) {
          return res.json({error: 'could not retrieve information about the stock'});
        } else {

          const stockSymbol = stockData.symbol;
          const stockPrice = stockData.latestPrice;
          // const likes = '' // TBD, need to do a DB for this I think
          const stock = await stocks.findOne({stock: stockSymbol});
          
          if (!stock) {
            // create the stock in the database
            const newStock = new Stock({
              stock: stockSymbol,
              price: stockPrice,
              likes: like ? 1 : 0 // might need to fix this
            })
              
            const savedStock = await stocks.insertOne(newStock);
            if (!savedStock) {
              return res.json({error: 'could not save the stock to the database'});
            } else {
              const stockToReturn = await stocks.findOne({stock: stockSymbol});
              return res.json({
                'stockData': {
                  stock: stockToReturn.stock,
                  price: stockToReturn.price,
                  likes: stockToReturn.likes
                }
              })
            }
          }

        }
      }

    });
    
};