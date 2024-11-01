function hasSingleSlash(str) {
  return str.split("/").length === 2;
}

// used for the entire num input
function isValidFraction(str) {
  const slash = "/";
  if (str[0] === slash) {
    return false;
  }
  if (str.slice(-1) === slash) {
    return false;
  }
  return hasSingleSlash(str);
}

// used for the entire num input
function hasAtMostOneDecimalPoint(str) {
  return str.split(".").length <= 2;
}

function isValidNumber(str) {
  return Number(str);
}

// used for the numerator and denominator of a fraction
function isValidDecimal(str) {
  const decimalPoint = ".";
  if (str[0] === decimalPoint) {
    return false;
  }
  if (str.slice(-1) === decimalPoint) {
    return false;
  }
  return hasAtMostOneDecimalPoint(str);
}

function splitInput(input) {
  // split the input into the number and the unit
  // the unit should always start with a letter
  const letters = /[a-z]/gi;
  const indexOfFirstLetter = input.search(letters);
  const initNum = input.substring(0, indexOfFirstLetter);
  console.log(initNum);
  const initUnit = input.substring(indexOfFirstLetter);
  console.log(initUnit);
  return {
    "splitNum": initNum,
    "splitUnit": initUnit
  }
}

function checkNum(input) {
  console.log("In the checkNum function")
  console.log(`Here's the checkNum input: ${input}`)
  // input MUST include a JUST a number
  let num;
  if (!input) {
    // return 1 if no number is provided
    console.log("a")
    num = "1";
  } else {
    num = input
    // const numOfSlashes = input.match(/\//gi);
    // if (numOfSlashes > 1) {
    //   num = false
    // } else if (isNaN(input)) {
    //   if (eval(input)) {
    //     num = eval(input)
    //   }
    // }
  } 
  console.log(`Here is what is returned from checkNum: ${num}`);
  return num;
}

function checkUnit(input) {
  const units = {
    gal: "L",
    L: "gal",
    mi: "km",
    km: "mi",
    lbs: "kg",
    kg: "lbs"
  };
  console.log("In the checkUnit function")
  console.log(`Here's the checkUnit input: ${input}`)
  
  let unit;
  if (input.toLowerCase() == "l") {
    // unit = input.substring(indexOfFirstLetter)
    unit = "L";
  } else {
    unit = input.toLowerCase();
  }
  
  console.log(input)
  console.log(unit);

  if (!Object.values(units).includes(unit)) {
  // if (!units.values.includes(unit)) {
      return false
  } else {
      return unit
  }
}

exports.splitInput = splitInput;
exports.checkNum = checkNum;
exports.checkUnit = checkUnit;