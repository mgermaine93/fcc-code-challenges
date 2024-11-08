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
                return checkedNum
            }
        }
    };
    
    this.getUnit = function(input) {
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
        if (initUnit in units) {
            const convertedNum = initNum * conversionRate[initUnit];
            return parseFloat(convertedNum.toFixed(5));
        }
    };
    
    this.getString = function(initNum, initUnit, returnNum, returnUnit) {
        return `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
    };
}

module.exports = ConvertHandler;