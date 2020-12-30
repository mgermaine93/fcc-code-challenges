function rot13(str) {
  // Split the input to turn it into an array
  let splitString = str.split("");
  // This will be "joined" at the end to create the output
  let convertedString = [];
  // Iterate through splitString
  for (let i = 0; i < splitString.length; i++) {
    // A-M // A = 65
    if (splitString[i].match(/^[A-M]$/gi)) {
      convertedString.push(String.fromCharCode((splitString[i].charCodeAt(0) + 13)));
    // N-Z // Z = 90
    } else if (splitString[i].match(/^[N-Z]$/gi)) {
      convertedString.push(String.fromCharCode((splitString[i].charCodeAt(0) - 13)));
    // Non-alphabetic characters
    } else {
      convertedString.push(splitString[i]);
    }
  }
  let finalString = convertedString.join("");
  return finalString;
}

// This ensures that the function can be tested in the test file.
module.exports = rot13;