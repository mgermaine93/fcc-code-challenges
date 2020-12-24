const convertToRoman = require('./roman-numeral-converter');

test('convertToRoman(2) should return "II"', () => {
  expect(convertToRoman(2)).toBe("II");
});

test('convertToRoman(3) should return "III"', () => {
  expect(convertToRoman(3)).toBe("III");
});

test('convertToRoman(4) should return "IV"', () => {
  expect(convertToRoman(4)).toBe("IV");
});

test('convertToRoman(5) should return "V"', () => {
  expect(convertToRoman(5)).toBe("V");
});

test('convertToRoman(9) should return "IX"', () => {
  expect(convertToRoman(9)).toBe("IX");
});

test('convertToRoman(12) should return "XII"', () => {
  expect(convertToRoman(12)).toBe("XII");
});

test('convertToRoman(16) should return "XVI"', () => {
  expect(convertToRoman(16)).toBe("XVI");
});

test('convertToRoman(29) should return "XXIX"', () => {
  expect(convertToRoman(29)).toBe("XXIX");
});

test('convertToRoman(44) should return "XLIV"', () => {
  expect(convertToRoman(44)).toBe("XLIV");
});

test('convertToRoman(45) should return "XLV"', () => {
  expect(convertToRoman(45)).toBe("XLV");
});

test('convertToRoman(68) should return "LXVIII"', () => {
  expect(convertToRoman(68)).toBe("LXVIII");
});

test('convertToRoman(83) should return "LXXXIII"', () => {
  expect(convertToRoman(83)).toBe("LXXXIII");
});

test('convertToRoman(97) should return "XCVII"', () => {
  expect(convertToRoman(97)).toBe("XCVII");
});

test('convertToRoman(99) should return "XCIX"', () => {
  expect(convertToRoman(99)).toBe("XCIX");
});

test('convertToRoman(400) should return "CD"', () => {
  expect(convertToRoman(400)).toBe("CD");
});

test('convertToRoman(500) should return "D"', () => {
  expect(convertToRoman(500)).toBe("D");
});

test('convertToRoman(501) should return "DI"', () => {
  expect(convertToRoman(501)).toBe("DI");
});

test('convertToRoman(649) should return "DCXLIX"', () => {
  expect(convertToRoman(649)).toBe("DCXLIX");
});

test('convertToRoman(798) should return "DCCXCVIII"', () => {
  expect(convertToRoman(798)).toBe("DCCXCVIII");
});

test('convertToRoman(891) should return "DCCCXCI"', () => {
  expect(convertToRoman(891)).toBe("DCCCXCI");
});

test('convertToRoman(1000) should return "M"', () => {
  expect(convertToRoman(1000)).toBe("M");
});

test('convertToRoman(1004) should return "MIV"', () => {
  expect(convertToRoman(1004)).toBe("MIV");
});

test('convertToRoman(1006) should return "MVI"', () => {
  expect(convertToRoman(1006)).toBe("MVI");
});

test('convertToRoman(1023) should return "MXXIII"', () => {
  expect(convertToRoman(1023)).toBe("MXXIII");
});

test('convertToRoman(2014) should return "MMXIV"', () => {
  expect(convertToRoman(2014)).toBe("MMXIV");
});

test('convertToRoman(3999) should return "MMMCMXCIX"', () => {
  expect(convertToRoman(3999)).toBe("MMMCMXCIX");
});
