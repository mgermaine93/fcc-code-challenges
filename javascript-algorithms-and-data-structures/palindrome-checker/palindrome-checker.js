function palindrome(str) {
  // Change all of the string's characters into the same case
  let lowerCaseString = str.toLowerCase();
  // Omit all whitespace
  let withoutSpacesString = lowerCaseString.replace(/\s/gi, "");
  // Find all alphanumeric characters
  let onlyAlphanumericArray = withoutSpacesString.match(/[a-z0-9]/gi);
  // Reverse the alphanumeric array to get the palindrome-to-test
  let reversedArray = []
  for (let i = onlyAlphanumericArray.length-1; i >= 0; i--) {
    reversedArray.push(onlyAlphanumericArray[i]);
  }
  // Compare the arrays
  for (let i = 0; i < onlyAlphanumericArray.length; i++) {
    if (onlyAlphanumericArray[i] != reversedArray[i]) {
      return false;
    }
  }
  return true;
}

// This ensures that the function can be tested in the test file.
module.exports = palindrome;