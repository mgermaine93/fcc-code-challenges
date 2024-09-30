const {
    checkNum,
    checkUnit
} = require("../utils/utils.js")

function ConvertHandler() {
    // conversion logic goes here

    const letters = /[a-z]/gi;
    const fraction = /\//gi;
    const decimalPoint = /\./gi;
    
    this.getNum = function(input) {
        const checkedNum = checkNum(input);
        if (!checkedNum) {
            return 'invalid number'
        } else {
            if (checkedNum == 1) {
                return 1
            } else {
                return checkedNum
            }
        }
    };
    
    this.getUnit = function(input) {
        // If the unit of measurement is invalid, returned will be 'invalid unit'.
        const checkedUnit = checkUnit(input);
        if (!checkedUnit) {
            return 'invalid unit'
        } else {
            return checkedUnit
        }
    };
    
    this.getReturnUnit = function(initUnit) {
        console.log(initUnit);
        let result;
        console.log(result);
        return result;
    };

    this.spellOutUnit = function(unit) {
        console.log(unit);
        let result;
        console.log(result);
        return result;
    };
    
    this.convert = function(initNum, initUnit) {
        console.log(initNum);
        console.log(initUnit);
        const galToL = 3.78541;
        const lbsToKg = 0.453592;
        const miToKm = 1.60934;
        let result;
        console.log(result);
        return result;
    };
    
    this.getString = function(initNum, initUnit, returnNum, returnUnit) {
        console.log(initNum);
        console.log(initUnit);
        console.log(returnNum);
        console.log(returnUnit);
        let result;
        console.log(result);
        return result;
    };
}

module.exports = ConvertHandler;