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

function checkNum(input, letters) {
  // input MUST include a number AND a unit for this to work properly
  const slash = "/"
  // const letters = /[a-z]/gi;
  console.log(input)
  const indexOfFirstLetter = input.search(letters);
  const num = input.substring(0, indexOfFirstLetter);
  if (!num) {
      return "1"
  } else if (isValidFraction(num)) {
      const numerator = num.split(slash)[0];
      const denominator = num.split(slash)[1];
      if (!isValidDecimal(numerator) && !isValidNumber(numerator)) {
          return false;
      } 
      if (!isValidDecimal(denominator) && !isValidNumber(denominator)) {
          return false;
      }
      console.log(`${num} is a valid fraction`);
      return num
  } else if (isValidDecimal(num)) {
      console.log(`${num} is a valid decimal`);
      return num
  } else if (isValidNumber(num)) {
      console.log(`${num} is a valid number`);
      return num
  } else {
      return false
  }
}

function checkUnit(input, letters, units) {
  console.log("In the checkUnit() function")
  const indexOfFirstLetter = input.search(letters);
  let unit;
  if (input.substring(indexOfFirstLetter) == "L") {
    unit = input.substring(indexOfFirstLetter)
  } else {
    unit = input.substring(indexOfFirstLetter).toLowerCase();
  }
  
  
  console.log(input)
  console.log(unit);
  console.log(letters)
  console.log(units)
  if (!Object.values(units).includes(unit)) {
  // if (!units.values.includes(unit)) {
      return false
  } else {
      return unit
  }
}

exports.checkNum = checkNum;
exports.checkUnit = checkUnit;