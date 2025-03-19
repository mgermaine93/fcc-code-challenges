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

// const ipSchema = new Schema({
//   hashedIp: {
//     type: String,
//     required: true
//   },
//   likes: {
//     type: Array,
//     required: true
//   }
// });

// compile model from schema
const Stock = mongoose.model("Stock", stockSchema, "stocks");
// const IP = mongoose.model("IP", ipSchema, "ips");


exports.Stock = Stock;
// exports.IP = IP;