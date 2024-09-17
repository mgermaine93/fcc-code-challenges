const letters = /[a-z]/gi;
const fraction = /\//gi;
const decimalPoint = /\./gi;
const input = "2.5"

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
  return true;
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
  return true;
}

// used for the entire num input
function hasAtMostTwoDecimalPoints(str) {
  return str.split(".").length <= 2;
}

function isNumber(str) {
  return Number(str);
}

function checkNum(input) {
    // If the number is invalid, returned will be 'invalid number'.
    let exceptions = 0;
    let fraction;
    let decimal;
    const slash = "/"
    const indexOfFirstLetter = input.search(letters);
    const num = input.substring(0, indexOfFirstLetter);
    // if it's not a fraction and not a decimal
    if (!hasSingleSlash(num) && !hasAtMostTwoDecimalPoints(num)) {

    }
    if (num[0] === slash || num[-1] === slash) {
      exceptions++
    }
    console.log(num)
    console.log(exceptions)
    return num;
  };

console.log(checkNum("25/5.4mi"))
