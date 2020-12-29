function telephoneCheck(str) {
    
  // List out the valid US phone number formats
  const validPatterns = [
    // 555-555-5555
    /^\d{3}-\d{3}-\d{4}$/,
    // (555)555-5555
    /^\(\d{3}\)\d{3}-\d{4}$/, 
    // (555) 555-5555
    /^\(\d{3}\) \d{3}-\d{4}$/,
    // 555 555 5555
    /^\d{3} \d{3} \d{4}$/, 
    // 5555555555
    /^\d{10}$/,
    // 1 555 555 5555
    /^1 \d{3} \d{3} \d{4}$/,
    // 1 (555) 555-5555
    /^1 \(\d{3}\) \d{3}-\d{4}$/,
    // 1(555)555-5555
    /^1\(\d{3}\)\d{3}-\d{4}$/,
    // 1 555-555-5555
    /^1 \d{3}-\d{3}-\d{4}$/
  ];
  
  // Loops through the patterns
  for (let i = 0; i < validPatterns.length; i++) {
    // If there's a match, return true
    if (validPatterns[i].test(str)) {
      return true;
    }
  }
  // Otherwise, return false
  return false;
}

// This ensures that the function can be tested in the test file.
module.exports = telephoneCheck;
