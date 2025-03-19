'use strict';

const bcrypt = require('bcrypt');
const express = require('express');
const app = express();

const { MongoClient } = require("mongodb");
const MONGO_URL= process.env.MONGO_URL;

// set up the mongo DB connection
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

      const baseUrl = "https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/";

      const stockInput = req.query.stock || '';

      if (!stockInput) {
        return res.json({
          error: 'at least one stock symbol is required'
        })
      }

      else if (Array.isArray(stockInput) && stockInput.length == 2) {

        console.log('there are two stocks to search')

        // there are two stocks to check
        const stock1 = String(req.query.stockInput[0]).trim().toUpperCase() || '';
        console.log(stock1);
        const stockData1 = await price(`${baseUrl}${stock1}/quote`);
        console.log(stockData1);
        

        const stock2 = String(req.query.stockInput[1]).trim().toUpperCase() || '';
        console.log(stock2);
        const stockData2 = await price(`${baseUrl}${stock2}/quote`);
        console.log(stockData2);

        const likeBoth = stringToBool(req.query.like) || false;
        console.log(likeBoth);

        if (!stockData1 || !stockData2) {
          return res.json({error: 'could not retrieve information about at least one of the stocks'});
        } else {

          const stock1Symbol = stockData1.symbol;
          const stock1Price = stockData1.latestPrice;
          const dbStock1 = await stocks.findOne({stock: stock1});

          const stock2Symbol = stockData2.symbol;
          const stock2Price = stockData2.latestPrice;
          const dbStock2 = await stocks.findOne({stock: stock2});

          if (!dbStock1 && !dbStock2) {

            const savedStock1 = await addStock(stock1Symbol, stock1Price, likeBoth, hash);
            const savedStock2 = await addStock(stock2Symbol, stock2Price, likeBoth, hash);

            return res.json({
              stockData: [
                {
                  'stock': stock1Symbol,
                  'price': stock1Price,
                  'rel_likes': dbStock1.likes.length - dbStock2.likes.length
                },
                {
                  'stock': stock2Symbol,
                  'price': stock2Price,
                  'rel_likes': dbStock2.likes.length - dbStock2.likes.length
                },
              ]
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

            const savedStock = await addStock(stockSymbol, stockPrice, like, hash);

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