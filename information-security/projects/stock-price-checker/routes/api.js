'use strict';

const express = require('express');
const app = express();

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

      const stocks = req.query.stock || '';

      if (!stocks) {
        return res.json({
          error: 'at least one stock symbol is required'
        })
      }

      if (Array.isArray(stocks) && stocks.length == 2) {

        // there are two stocks to check
        const stock1 = req.query.stock[0].trim().toUpperCase() || '';
        console.log(stock1);

        const stock2 = req.query.stock[1].trim().toUpperCase() || '';
        console.log(stock2);

        const like = req.query.like || false;
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
          const stock1Likes = '' // TBD, need to do a DB for this I think

          const stock2Symbol = stockData2.symbol;
          const stock2Price = stockData2.latestPrice;
          const stock2Likes = '' // TBD, need to do a DB for this I think

          return res.json({
            'stockData': [
              {
                'stock': stock1Symbol,
                'price': stock1Price,
                'rel_likes': stock1Likes
              },
              {
                'stock': stock2Symbol,
                'price': stock2Price,
                'rel_likes': stock2Likes
              },
            ]
          })
        }

      }

      else if (typeof stocks === "string") {

        // there is one stock to check
        const stock = req.query.stock.trim().toUpperCase() || '';
        console.log(stock);
      
        const like = req.query.like || false;
        console.log(like);

        const stockData = await price(`${baseUrl}${stock}/quote`);
        if (!stockData) {
          return res.json({error: 'could not retrieve information about the stock'});
        } else {
          const stockSymbol = stockData.symbol;
          const stockPrice = stockData.latestPrice;
          const likes = '' // TBD, need to do a DB for this I think
          return res.json({
            'stockData': {
              'stock': stockSymbol,
              'price': stockPrice,
              'likes': likes
            }
          })
        }
      }

    });
    
};