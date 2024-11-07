function hasSingleSlash(str) {
  return str.split("/").length === 2;
}

function isValidNumber(str) {
  if (Number(str)) {
    return true
  } else {
    return false
  }
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
  // input should always be a string
  console.log("In the checkNum function")
  console.log(`Here's the checkNum input: ${input}`)
  const slash = /\//gi;
  let num;
  if (!input) {
    // return 1 if no number is provided
    num = 1;
  } else {
    if (!isValidNumber(input)) {
      // if we're in here, "input" is either invalid or a fraction
      if (hasSingleSlash(input)) {
        const numerator = input.split("/")[0];
        const denominator = input.split("/")[1];
        if (!isValidNumber(numerator)) {
          return false
        }
        if (!isValidNumber(denominator)) {
          return false
        }
        // might need to play with rounding here
        return numerator/denominator
      }
      // if we're here, then "input" should definitely be invalid
      return false
    }
    num = input
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