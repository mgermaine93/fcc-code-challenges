const {
    checkNum,
    checkUnit
} = require("../utils/utils.js")

const {
    units,
    conversionRate,
    unitMapping,
    letters,
    fraction,
    decimalPoint
} = require('../utils/constants.js')

function ConvertHandler() {
    // conversion logic goes here
    this.getNum = function(input) {
        const checkedNum = checkNum(input, letters);
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
        const checkedUnit = checkUnit(input, letters, units);
        if (!checkedUnit) {
            return 'invalid unit'
        } else {
            return checkedUnit
        }
    };
    
    this.getReturnUnit = function(initUnit) {
        if (initUnit in units) {
            console.log(units[initUnit]);
            return units[initUnit];
        }
    };

    this.spellOutUnit = function(unit) {
        if (unit in unitMapping) {
            console.log(unitMapping[unit])
            return unitMapping[unit]
        }
    };
    
    this.convert = function(initNum, initUnit) {
        console.log("In the convert function")
        console.log(initNum);
        console.log(initUnit);
        const returnUnit = units[initUnit];
        if (initUnit in units) {
            console.log(units[initUnit]);
            return units[initUnit];
        }
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