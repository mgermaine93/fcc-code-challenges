// idea from https://github.com/nibble0101/metric-imperial-converter
const galToL = 3.78541;
const lbsToKg = 0.453592;
const miToKm = 1.60934;

const letters = /[a-z]/gi;
const fraction = /\//gi;
const decimalPoint = /\./gi;

const units = {
    gal: "L",
    L: "gal",
    mi: "km",
    km: "mi",
    lbs: "kg",
    kg: "lbs"
};

const conversionRate = {
    gal: galToL,
    L: 1 / galToL,
    mi: miToKm,
    km: 1 / miToKm,
    lbs: lbsToKg,
    kg: 1 / lbsToKg
};

const unitMapping = {
    gal: "gallons",
    L: "liters",
    mi: "miles",
    km: "kilometers",
    lbs: "pounds",
    kg: "kilograms"
};

exports.letters = letters;
exports.fraction = fraction;
exports.decimalPoint = decimalPoint;
exports.units = units;
exports.conversionRate = conversionRate;
exports.unitMapping = unitMapping;