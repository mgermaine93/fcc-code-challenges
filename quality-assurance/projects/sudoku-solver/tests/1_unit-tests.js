const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver;

suite('Unit Tests', () => {

    test("Logic handles a valid puzzle string of 81 characters.", () => {
        assert.fail();
    });

    test("Logic handles a puzzle string with invalid characters (not 1-9 or '.').", () => {
        assert.fail()
    });

    test("Logic handles a puzzle string that is not 81 characters in length.", () => {
        assert.fail()
    });

    test("Logic handles a valid row placement.", () => {
        assert.fail();
    });

    test("Logic handles an invalid row placement.", () => {
        assert.fail()
    });

    test("Logic handles a valid column placement.", () => {
        assert.fail()
    });

    test("Logic handles an invalid column placement.", () => {
        assert.fail();
    });

    test("Logic handles a valid region (3x3 grid) placement.", () => {
        assert.fail()
    });

    test("Logic handles an invalid region (3x3 grid) placement.", () => {
        assert.fail()
    });

    test("Valid puzzle strings pass the solver.", () => {
        assert.fail();
    });

    test("Invalid puzzle strings fail the solver.", () => {
        assert.fail()
    });

    test("Solver returns the expected solution for an incomplete puzzle.", () => {
        assert.fail()
    });

});