require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { MongoClient } = require("mongodb")
const dns = require('dns');
const url = require('url');
const app = express();


MONGO_URL= process.env.MONGO_URL;
// const { MongoClient } = require('mongodb');

// set up the mongo DB connection
const client = new MongoClient(MONGO_URL);
const database = client.db("url-shortener");
const urls = database.collection("urls");

// Basic Configuration
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// define the schema
const Schema = mongoose.Schema;

const urlSchema = new Schema({
  original_url: {
    type: String,
    required: true
  },
  short_url: {
    type: Number,
    required: true
  }
})

// compile model from schema
let Url = mongoose.model("Url", urlSchema, "urls");

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// post the data to save it first
app.post('/api/shorturl', function(req, res) {
  const userInputUrl = req.body.url;
  console.log(userInputUrl);
  const dnslookup = dns.lookup(new URL(userInputUrl).hostname, async (err, address, family) => {
    console.log(`Here's the address: ${address}`);
    if (!address) {
      res.json({
        error: 'invalid URL' 
      });
    } else {
      const numDocuments = await urls.countDocuments({});

      // valid url, save to database
      const urlDocument = {
        original_url: userInputUrl,
        short_url: numDocuments
      }

      const result = await urls.insertOne(urlDocument);

      res.json({
        original_url: userInputUrl,
        short_url: numDocuments
      });
    }
  });
});

app.get('/api/shorturl/:short_url', async (req, res) => {
  
  // retrieve the short_url from the url
  const short_url = req.params.short_url;

  // look up the short url in the database
  const result = await urls.findOne({short_url: +short_url});

  // perform the redirect to the original url
  res.redirect(result.original_url);
  
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
