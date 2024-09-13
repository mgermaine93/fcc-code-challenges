'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

// routes go in here
module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route("/api/convert").get((req, res) => {

    console.log("In the route!")
    const user_input = req.query.input
    const num = convertHandler.getNum(user_input);
    const unit = convertHandler.getUnit(user_input);
    console.log(num);
    console.log(unit)
    console.log("Leaving the route!")
    // res.json(user_input);
  })

};