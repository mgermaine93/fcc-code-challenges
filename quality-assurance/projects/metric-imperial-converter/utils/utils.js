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





function checkNum(input) {
    // input MUST include a number AND a unit for this to work properly
    const slash = "/"
    const indexOfFirstLetter = input.search(letters);
    const num = input.substring(0, indexOfFirstLetter);
    if (!num) {
        return "1"
    } else if (isValidFraction(num)) {
        const numerator = num.split(slash)[0];
        const denominator = num.split(slash)[1];
        if (!isValidDecimal(numerator) && !isValidNumber(numerator)) {
            return 'invalid number 1';
        } 
        if (!isValidDecimal(denominator) && !isValidNumber(denominator)) {
            return 'invalid number 2'
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
        return "invalid number 3"
    }
};

console.log(checkNum("25/5.4mi"))
