'use strict';

const express = require('express');
const app = express();

const MONGO_URL = process.env.MONGO_URL;
const BASE_URL = process.env.BASE_URL;

// set up the mongo DB connection
const { MongoClient } = require("mongodb");
const client = new MongoClient(MONGO_URL);
const database = client.db("stock-price-checker");
const stocks = database.collection("stocks");

const { 
  price, 
  hashedIp, 
  hasLikedBefore, 
  addStock, 
  stringToBool
} = require("../utils");


module.exports = (app) => {

  app.route('/api/stock-prices')

    .get(async (req, res) => {

      // get the user's IP
      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      const hash = await hashedIp(ip);

      const stockInput = req.query.stock || '';

      if (!stockInput) {
        return res.json({
          error: 'at least one stock symbol is required'
        })
      }

      else if (Array.isArray(stockInput) && stockInput.length == 2) {

        // there are two stocks to check
        const stock1 = String(stockInput[0]).trim().toUpperCase() || '';
        const stockData1 = await price(`${BASE_URL}${stock1}/quote`);
        
        const stock2 = String(stockInput[1]).trim().toUpperCase() || '';
        const stockData2 = await price(`${BASE_URL}${stock2}/quote`);

        const likeBoth = stringToBool(req.query.like) || false;

        if (!stockData1 && !stockData2) {
          return res.json({error: 'could not retrieve information from FCC about either stock'});
        } else if (!stockData1 || !stockData2) {
          return res.json({error: 'could not retrieve information from FCC about at least one of the stocks'});
        } else {

          const stock1Symbol = stockData1.symbol;
          const stock1Price = stockData1.latestPrice;
          const dbStock1 = await stocks.findOne({stock: stock1});

          const stock2Symbol = stockData2.symbol;
          const stock2Price = stockData2.latestPrice;
          const dbStock2 = await stocks.findOne({stock: stock2});

          if (!dbStock1 && !dbStock2) {

            try {
              const savedStock1 = await addStock(stock1Symbol, stock1Price, likeBoth, hash);
              const savedStock2 = await addStock(stock2Symbol, stock2Price, likeBoth, hash);
            } catch (err) {
              return res.json({error: `could not add stock: ${err}`});
            }
          
          }

          else if (!dbStock1 || !dbStock2) {

            if (!dbStock1) {
              try {
                const savedStock1 = await addStock(stock1Symbol, stock1Price, likeBoth, hash);
              } catch (err) {
                return res.json({error: `could not add stock: ${err}`});
              }
            } else if (!dbStock2) {
              try {
                const savedStock2 = await addStock(stock2Symbol, stock2Price, likeBoth, hash);
              } catch {
                return res.json({error: `could not add stock: ${err}`});
              }
            }            
          
          }

          // the stocks should now already be in the database, so we'll need to check for likes
          if (likeBoth) {

            const isStock1Liked = await hasLikedBefore(ip, dbStock1.likes);
            const isStock2Liked = await hasLikedBefore(ip, dbStock2.likes);
            
            if (!isStock1Liked) {
              // add the ip to the stock likes
              try {
                const updatedStock1 = stocks.findOneAndUpdate(
                  {stock: stock1Symbol}, // the stock to look up
                  {$push: {
                    likes: hash
                  }},
                  {new: true} // return
                )
              } catch (err) {
                return res.json({error: `could not like the stock: ${err}`});
              }
            }
            else if (!isStock2Liked) {
              // add the ip to the stock likes
              try {
                const updatedStock2 = stocks.findOneAndUpdate(
                  {stock: stock2Symbol}, // the stock to look up
                  {$push: {
                    likes: hash
                  }},
                  {new: true} // return
                )
              } catch (err) {
                return res.json({error: `could not like the stock: ${err}`});
              }
              
            }
          }
          
          // here we don't need to like the stocks, we just need to return them
          try {

            const newDbStock1 = await stocks.findOne({stock: stock1});
            const newDbStock2 = await stocks.findOne({stock: stock2});

            return res.json({

              stockData: [
                {
                  stock: newDbStock1.stock,
                  price: newDbStock1.price,
                  rel_likes: newDbStock1.likes.length - newDbStock2.likes.length
                },
                {
                  stock: newDbStock2.stock,
                  price: newDbStock2.price,
                  rel_likes: newDbStock2.likes.length - newDbStock1.likes.length
                }
              ]

            })

          } catch (err) {
            return res.json({error: `could not retrieve the stocks: ${err}`});
          }
          
        }

      }

      else if (typeof stockInput === "string") {

        // there is one stock to check
        const stock = String(req.query.stock).trim().toUpperCase() || '';
        const like = stringToBool(req.query.like) || false;

        const stockData = await price(`${BASE_URL}${stock}/quote`);

        if (!stockData) {
          return res.json({error: 'could not retrieve information about the stock'});
        } else {

          const stockSymbol = stockData.symbol;
          const stockPrice = stockData.latestPrice;
          const stock = await stocks.findOne({stock: stockSymbol});
          
          if (!stock) {

            try {
              const savedStock = await addStock(stockSymbol, stockPrice, like, hash);
            } catch (err) {
              return res.json({error: `could not save the stock: ${err}`});
            }
          
          } else {

            // the stock is already in the database, so we'll need to check for likes
            const stockToReturn = await stocks.findOne({stock: stockSymbol});
            const hasStockBeenLikedBefore = await hasLikedBefore(ip, stockToReturn.likes)
            if (!stockToReturn) {
              return res.json({error: 'could not retrieve the stock from the database'});
            }
            
            // check to see if the stock is already in the IPs "likes"
            if (!hasStockBeenLikedBefore && like) {
              try {
                const stockToUpdate = stocks.findOneAndUpdate(
                  {stock: stockSymbol}, // the stock to look up
                  {$push: {
                    likes: hash
                  }},
                  {new: true} // return
                )
              } catch (err) {
                return res.json({error: `could not like the stock: ${err}`});
              }
            }
            
          }

          // return the updated stock
          try {
            const updatedStock = await stocks.findOne({stock: stockSymbol});
            return res.json({
              stockData: {
                stock: updatedStock.stock,
                price: updatedStock.price,
                likes: updatedStock.likes.length
              }
            })
          } catch (err) {
            return res.json({error: `could not find the stock: ${err}`});
          }

        }
      }

    });
    
};