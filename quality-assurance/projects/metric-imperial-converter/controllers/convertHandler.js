const {
    splitInput,
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
        const num = splitInput(input)["splitNum"];
        const checkedNum = checkNum(num);
        if (!checkedNum) {
            return 'invalid number'
        } else {
            if (checkedNum == 1) {
                return 1
            } else {
                return eval(checkedNum)
            }
        }
    };
    
    this.getUnit = function(input) {
        // If the unit of measurement is invalid, returned will be 'invalid unit'.
        const unit = splitInput(input)["splitUnit"];
        const checkedUnit = checkUnit(unit);
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
        console.log(`${initNum}, ${initUnit}`)
        if (initUnit in units) {
            // https://stackoverflow.com/questions/7142657/convert-fraction-string-to-decimal
            const parsedNum = eval(initNum);
            console.log(`Here is the number num: ${parsedNum}`);
            const convertedNum = parsedNum/conversionRate[initUnit];
            return parseFloat(convertedNum.toFixed(5));
        }
    };
    
    this.getString = function(initNum, initUnit, returnNum, returnUnit) {
        return `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
    };
}

module.exports = ConvertHandler;