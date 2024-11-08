const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {

    test("convertHandler() should correctly read a whole number input.", () => {
        // assert.strictEqual(userInput, desiredValue, message);
        // can have multiple asserts...() in the same test.
        assert.strictEqual(
            convertHandler.getNum("2mi"),
            2,
            "Correctly read valid whole number input."
        );
    });
    
    test("convertHandler() should correctly read a decimal number input.", () => {
        assert.strictEqual(
            convertHandler.getNum("2.2mi"),
            2.2,
            "Correctly read valid decimal number input."
        );
    });

    test("convertHandler() should correctly read a fractional input.", () => {
        assert.strictEqual(
            convertHandler.getNum("1/5mi"),
            0.2,
            "Correctly read valid fractional number input."
        );
    });

    test("convertHandler() should correctly read a fractional input with a decimal.", () => {
        assert.strictEqual(
            convertHandler.getNum("3/2.7mi"),
            1.111111111111111,
            "Correctly read valid fractional input with a decimal."
        );
    });

    test("convertHandler() should correctly return an error on a double-fraction (i.e., 3/2/3).", () => {
        assert.strictEqual(
            convertHandler.getNum("3/2/3mi"),
            false,
            "Correctly returned an error on a double-fraction."
        );
    });

    test("convertHandler() should correctly default to a numerical input of 1 when no numerical input is provided.", () => {
        assert.strictEqual(
            convertHandler.getNum("mi"),
            1,
            "Correctly defaulted to a numerical input of 1 when no numerical input is provided."
        )
    });

    test("convertHandler() should correctly read each valid input unit.", () => {
        assert.strictEqual(
            convertHandler.getUnit("1gal"),
            "gal",
            "Correctly read 'gal' as a valid input unit."
        )
        assert.strictEqual(
            convertHandler.getUnit("2L"),
            "L",
            "Correctly read 'L' as a valid input unit."
        )
        assert.strictEqual(
            convertHandler.getUnit("3mi"),
            "mi",
            "Correctly read 'mi' as a valid input unit."
        )
        assert.strictEqual(
            convertHandler.getUnit("4km"),
            "km",
            "Correctly read 'km' as a valid input unit."
        )
        assert.strictEqual(
            convertHandler.getUnit("5.5lbs"),
            "lbs",
            "Correctly read 'lbs' as a valid input unit."
        )
        assert.strictEqual(
            convertHandler.getUnit("6.8/9kg"),
            "kg",
            "Correctly read 'kg' as a valid input unit."
        )
    });

    test("convertHandler() should correctly return an error for an invalid input unit.", () => {
        assert.strictEqual(
            convertHandler.getUnit("5.0/9"),
            false,
            "Correctly returned an error for an invalid (empty) input unit."
        )
        assert.strictEqual(
            convertHandler.getUnit("99bottlesofbeeronthewall"),
            false,
            "Correctly returned an error for an invalid input unit."
        )
    });

    test("convertHandler() should return the correct return unit for each valid input unit.", () => {
        assert.strictEqual(
            convertHandler.getReturnUnit("gal"),
            "L",
            "Correctly converted 'gal' to 'L'."
        )
        assert.strictEqual(
            convertHandler.getReturnUnit("L"),
            "gal",
            "Correctly converted 'L' to 'gal'."
        )
        assert.strictEqual(
            convertHandler.getReturnUnit("mi"),
            "km",
            "Correctly converted 'mi' to 'km'."
        )
        assert.strictEqual(
            convertHandler.getReturnUnit("km"),
            "mi",
            "Correctly converted 'km' to 'mi'."
        )
        assert.strictEqual(
            convertHandler.getReturnUnit("lbs"),
            "kg",
            "Correctly converted 'lbs' to 'kg'."
        )
        assert.strictEqual(
            convertHandler.getReturnUnit("kg"),
            "lbs",
            "Correctly converted 'lbs' to 'lbs'."
        )
    });

    test("convertHandler() should correctly return the spelled-out string unit for each valid input unit.", () => {
        assert.strictEqual(
            convertHandler.spellOutUnit("gal"),
            "gallons",
            "correctly spelled out 'gallons'."
        )
        assert.strictEqual(
            convertHandler.spellOutUnit("L"),
            "liters",
            "correctly spelled out 'liters'."
        )
        assert.strictEqual(
            convertHandler.spellOutUnit("mi"),
            "miles",
            "correctly spelled out 'miles'."
        )
        assert.strictEqual(
            convertHandler.spellOutUnit("km"),
            "kilometers",
            "correctly spelled out 'kilometers."
        )
        assert.strictEqual(
            convertHandler.spellOutUnit("lbs"),
            "pounds",
            "correctly spelled out 'pounds'."
        )
        assert.strictEqual(
            convertHandler.spellOutUnit("kg"),
            "kilograms",
            "correctly spelled out 'kilograms'."
        )
    });

    test("convertHandler() should correctly convert gal to L.", () => {
        assert.strictEqual(
            convertHandler.convert(5.5, "gal"),
            20.81976,
            "Correctly converted gal to L."
        )
    });

    test("convertHandler() should correctly convert L to gal.", () => {
        assert.strictEqual(
            convertHandler.convert(2.5, "L"),
            0.66043,
            "Correctly converted L to gal."
        )
    });

    test("convertHandler() should correctly convert mi to km.", () => {
        assert.strictEqual(
            convertHandler.convert(3.1, "mi"),
            4.98895,
            "Correctly converted mi to km."
        )
    });

    test("convertHandler() should correctly convert km to mi.", () => {
        assert.strictEqual(
            convertHandler.convert(5, "km"),
            3.10686,
            "Correctly converted km to mi."
        )
    });

    test("convertHandler() should correctly convert lbs to kg.", () => {
        assert.strictEqual(
            convertHandler.convert(25, "lbs"),
            11.33980,
            "Correctly converted lbs to kg."
        )
    });

    test("convertHandler() should correctly convert kg to lbs.", () => {
        assert.strictEqual(
            convertHandler.convert(100, "kg"),
            220.46244,
            "Correctly converted kg to lbs."
        )
    });

  // -----------------------------------------------------------------------------
});
