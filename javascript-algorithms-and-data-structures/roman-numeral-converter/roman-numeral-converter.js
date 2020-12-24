function convertToRoman(num) {
    let convertedNumberArray = [];
    let romanNumeralValues = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    let romanNumerals = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];

    // Loop through the given "num"
    for (let i=0; i<romanNumeralValues.length; i++) {
        // While the given number is greater than the higher values in the romanNumeralValues array...
        while (num >= romanNumeralValues[i]) {
            // Add the greater ROMAN NUMERALS to the output...
            convertedNumberArray.push(romanNumerals[i]);
            // And subtract the corresponding VALUE from the given number
            num-=romanNumeralValues[i];
        }
    }
    // Needs to return a string
    let convertedNumberString = convertedNumberArray.join("");
    return convertedNumberString;
}

// This ensures that the function can be tested in the test file.
module.exports = convertToRoman;