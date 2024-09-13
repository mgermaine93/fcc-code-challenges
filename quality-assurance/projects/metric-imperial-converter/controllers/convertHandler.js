 function ConvertHandler() {
  // conversion logic goes here

  const letters = /[a-z]/gi;
  const fraction = /\//gi;
  const decimalPoint = /\./gi;
  
  this.getNum = function(input) {
    // If the number is invalid, returned will be 'invalid number'.
    let exceptions = 0;
    const indexOfFirstLetter = input.search(letters);
    const result = input.substring(0, indexOfFirstLetter);
    // if no number is given, assume it's 1
    if (!result) {
        return 1
    // if a number IS given, first check to see that it isn't a fraction or decimal
    } else if (result.match(fraction)) {
        const numerator = result.split("/")[0];
        const denominator = result.split("/")[1];
        if (result.match(fraction).length !== 1) {
            exceptions++
        }
        // need to check for fractions and/or decimals
        // 2.5/6, 6.5/8.0, etc.
        // verify that the numerator is valid
        if (numerator.match(decimalPoint).length !== 1) {
            exceptions++
        }
        if (numerator[0] == "." && numerator[-1] == ".") {
            exceptions++
        }
        // verify that the denominator is valid
        if (denominator.match(decimalPoint).length !== 1) {
            exceptions++
        }
        if (denominator[0] == "." && numerator[-1] == ".") {
            exceptions++
        }
    // check for just decimals
    } else if (result.match(decimalPoint)) {
        if (denominator.match(decimalPoint).length !== 1) {
            exceptions++
        }
        if (denominator[0] == "." && numerator[-1] == ".") {
            exceptions++
        }
    }
    if (exceptions > 0) {
        return "invalid number";
    }
    return result;
  };
  //  && !result.match(decimalPoint)
  
  this.getUnit = function(input) {
    // If the unit of measurement is invalid, returned will be 'invalid unit'.
    const indexOfFirstLetter = input.search(letters);
    const result = input.substring(indexOfFirstLetter);
    return result;
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