'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

// routes go in here
module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route("/api/convert").get((req, res) => {

    const user_input = req.query.input
    const initNum = convertHandler.getNum(user_input);
    const initUnit = convertHandler.getUnit(user_input);

    let result;

    if (!initNum && !initUnit) {
      result = "invalid number and unit"
    } else {
      if (!initNum) {
        result = "invalid number"
      } else if (!initUnit) {
        result = "invalid unit"
      } else {

        const returnUnit = convertHandler.getReturnUnit(initUnit);
        const spelledOutInitUnit = convertHandler.spellOutUnit(initUnit);
        const spelledOutReturnUnit = convertHandler.spellOutUnit(returnUnit);
        const returnNum = convertHandler.convert(initNum, initUnit);
        const returnString = convertHandler.getString(initNum, spelledOutInitUnit, returnNum, spelledOutReturnUnit);

        result = {
          initNum: initNum,
          initUnit: initUnit,
          returnNum: returnNum,
          returnUnit: returnUnit,
          string: returnString
        }
      }
    }

    res.json(result);

  });

};