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
            return units[initUnit];
        }
    };

    this.spellOutUnit = function(unit) {
        if (unit in unitMapping) {
            return unitMapping[unit]
        }
    };
    
    this.convert = function(initNum, initUnit) {
        console.log("In the convert function")
        if (initUnit in units) {
            return initNum/conversionRate[initUnit];
        }
    };
    
    this.getString = function(initNum, initUnit, returnNum, returnUnit) {
        return `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
    };
}

module.exports = ConvertHandler;