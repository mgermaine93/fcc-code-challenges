const mongoose = require('mongoose');

// define the schema
const Schema = mongoose.Schema;

const stockSchema = new Schema({
  stock: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  likes: {
    type: Array,
    required: true
  }
});

// compile model from schema
const Stock = mongoose.model("Stock", stockSchema, "stocks");

exports.Stock = Stock;