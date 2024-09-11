'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

// routes go in here
module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route("/api/convert").get((req, res) => {

    const user_input = req.query.input
    console.log(user_input);
    res.json(user_input);
  })

};