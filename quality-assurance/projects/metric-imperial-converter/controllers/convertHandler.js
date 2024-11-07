const {
    splitInput,
    checkNum,
    checkUnit
} = require("../utils/utils.js")

const {
    units,
    conversionRate,
    unitMapping,
} = require('../utils/constants.js')

function ConvertHandler() {
    // conversion logic goes here
    this.getNum = function(input) {
        const num = splitInput(input)["splitNum"];
        const checkedNum = checkNum(num);
        if (!checkedNum) {
            return false
        } else {
            if (checkedNum == 1) {
                return 1
            } else {
                // might not need the eval part here, just the return
                return eval(checkedNum)
            }
        }
    };
    
    this.getUnit = function(input) {
        // If the unit of measurement is invalid, returned will be 'invalid unit'.
        const unit = splitInput(input)["splitUnit"];
        const checkedUnit = checkUnit(unit);
        if (!checkedUnit) {
            return false
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
            // might not need the eval part here...
            const parsedNum = eval(initNum); // might need to fix this later...
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