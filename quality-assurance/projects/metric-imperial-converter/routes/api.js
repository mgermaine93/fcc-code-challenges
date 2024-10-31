'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

// routes go in here
module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route("/api/convert").get((req, res) => {

    console.log("In the route!")
    const user_input = req.query.input
    const initNum = convertHandler.getNum(user_input);
    const initUnit = convertHandler.getUnit(user_input);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const spelledOutInitUnit = convertHandler.spellOutUnit(initUnit);
    const spelledOutReturnUnit = convertHandler.spellOutUnit(returnUnit);
    const returnNum = convertHandler.convert(initNum, returnUnit);
    const returnString = convertHandler.getString(initNum, spelledOutInitUnit, returnNum, spelledOutReturnUnit);
    console.log(`Here is the init num: ${initNum}`);
    console.log(`Here is the init unit: ${initUnit}`);
    console.log(`Here is the spelled out init unit: ${spelledOutInitUnit}`);
    console.log(`Here is the return num: ${returnNum}`);
    console.log(`Here is the return unit: ${returnUnit}`);
    console.log(`Here is the spelled out return unit: ${spelledOutReturnUnit}`);
    console.log(`Here is the return string: ${returnString}`);
    console.log("Leaving the route!");

    res.json({
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: returnString
    });
    
  });

};