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
        )
    });
    
    test("convertHandler() should correctly read a decimal number input.", () => {
        // assert.strictEqual(userInput, desiredValue, message);
        assert.fail();
    });

    test("convertHandler() should correctly read a fractional input.", () => {
        // assert.strictEqual(userInput, desiredValue, message);
        assert.fail();
    });

    test("convertHandler() should correctly read a fractional input with a decimal.", () => {
        // assert.strictEqual(userInput, desiredValue, message);
        assert.fail();
    });

    test("convertHandler() should correctly return an error on a double-fraction (i.e. 3/2/3.", () => {
        // assert.strictEqual(userInput, desiredValue, message);
        assert.fail();
    });

    test("convertHandler() should correctly default to a numerical input of 1 when no numerical input is provided.", () => {
        // assert.strictEqual(userInput, desiredValue, message);
        assert.fail();
    });

    test("convertHandler() should correctly read each valid input unit.", () => {
        // assert.strictEqual(userInput, desiredValue, message);
        assert.fail();
    });

    test("convertHandler() should correctly return an error for an invalid input unit.", () => {
        // assert.strictEqual(userInput, desiredValue, message);
        assert.fail();
    });

    test("convertHandler() should return the correct return unit for each valid input unit.", () => {
        // assert.strictEqual(userInput, desiredValue, message);
        assert.fail();
    });

    test("convertHandler() should correctly return the spelled-out string unit for each valid input unit.", () => {
        // assert.strictEqual(userInput, desiredValue, message);
        assert.fail();
    });

    test("convertHandler() should correctly convert gal to L.", () => {
        // assert.strictEqual(userInput, desiredValue, message);
        assert.fail();
    });

    test("convertHandler() should correctly convert L to gal.", () => {
        // assert.strictEqual(userInput, desiredValue, message);
        assert.fail();
    });

    test("convertHandler() should correctly convert mi to km.", () => {
        // assert.strictEqual(userInput, desiredValue, message);
        assert.fail();
    });

    test("convertHandler() should correctly convert km to mi.", () => {
        // assert.strictEqual(userInput, desiredValue, message);
        assert.fail();
    });

    test("convertHandler() should correctly convert lbs to kg.", () => {
        // assert.strictEqual(userInput, desiredValue, message);
        assert.fail();
    });

    test("convertHandler() should correctly convert kg to lbs.", () => {
        // assert.strictEqual(userInput, desiredValue, message);
        assert.fail();
    });

  // -----------------------------------------------------------------------------
});
