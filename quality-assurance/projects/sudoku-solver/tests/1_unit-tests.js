const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('Unit Tests', () => {

    test("Logic handles a valid puzzle string of 81 characters.", () => {
        const testPuzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
        assert.deepEqual(
            // actual
            solver.validate(testPuzzle),
            // expected
            true,
            // message
            'Expected the solver to correctly identify and handle a valid puzzle string of 81 characters'
        );
    });

    test("Logic handles a puzzle string with invalid characters (not 1-9 or '.').", () => {      
        const testPuzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.???';  
        assert.deepEqual(
            solver.validate(testPuzzle),
            {error: 'Invalid characters in puzzle'},
            'Expected the solver to correctly identify and handle a puzzle string with invalid characters'
        )
    });

    test("Logic handles a puzzle string that is not 81 characters in length.", () => {
        const testPuzzle = '...';
        assert.deepEqual(
            solver.validate(testPuzzle),
            {error: 'Expected puzzle to be 81 characters long'},
            'Expected the solver to correctly identify and handle a puzzle string that is not 81 characters in length'
        )
    });

    test("Logic handles a valid row placement.", () => {
        const testPuzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        const testRow = 'A';
        const testColumn = '1';
        const testValue = '7'
        assert.deepEqual(
            solver.checkRowPlacement(testPuzzle, testRow, testColumn, testValue),
            true,
            'Expected the solver to correctly identify and handle a valid row placement'
        )
    });

    test("Logic handles an invalid row placement.", () => {
        const testPuzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        const testRow = 'A';
        const testColumn = '1';
        const testValue = '5';
        assert.deepEqual(
            solver.checkRowPlacement(testPuzzle, testRow, testColumn, testValue),
            false,
            'Expected the solver to correctly identify and handle an invalid row placement'
        )
    });

    test("Logic handles a valid column placement.", () => {
        const testPuzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        const testRow = 'A';
        const testColumn = '1';
        const testValue = '2';
        assert.deepEqual(
            solver.checkColPlacement(testPuzzle, testRow, testColumn, testValue),
            true,
            'Expected the solver to correctly identify and handle a valid column placement'
        )
    });

    test("Logic handles an invalid column placement.", () => {
        const testPuzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        const testRow = 'A';
        const testColumn = '1';
        const testValue = '6';
        assert.deepEqual(
            solver.checkColPlacement(testPuzzle, testRow, testColumn, testValue),
            false,
            'Expected the solver to correctly identify and handle an invalid column placement'
        )
    });

    test("Logic handles a valid region (3x3 grid) placement.", () => {
        const testPuzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        const testRow = 'A';
        const testColumn = '1';
        const testValue = '7';
        assert.deepEqual(
            solver.checkRegionPlacement(testPuzzle, testRow, testColumn, testValue),
            true,
            'Expected the solver to correctly identify and handle a valid region placement'
        )
    });

    test("Logic handles an invalid region (3x3 grid) placement.", () => {
        const testPuzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        const testRow = 'A';
        const testColumn = '1';
        const testValue = '5';
        assert.deepEqual(
            solver.checkRegionPlacement(testPuzzle, testRow, testColumn, testValue),
            false,
            'Expected the solver to correctly identify and handle an invalid region placement'
        )
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