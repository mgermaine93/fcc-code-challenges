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
        const validPuzzle = '.7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6';
        const solution = '473891265851726394926345817568913472342687951197254638734162589685479123219538746';
        const response = solver.solve(validPuzzle);
        assert.deepEqual(
            response, 
            solution, 
            'Expected the solver to correctly pass and solve a valid puzzle'
        )
    });

    test("Invalid puzzle strings fail the solver.", () => {
        const invalidPuzzle = '5.3..7....6..195....98....6.8...6...34..8..3..17...2...6....28....419..5....8..79';
        const solution = false;
        const response = solver.solve(invalidPuzzle);
        assert.deepEqual(
            response, 
            solution, 
            'Expected the solver to correctly fail an invalid puzzle'
        )
    });

    test("Solver returns the expected solution for an incomplete puzzle.", () => {
        const validPuzzle = '.7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6';
        const solution = '473891265851726394926345817568913472342687951197254638734162589685479123219538746';
        const response = solver.solve(validPuzzle);
        assert.deepEqual(
            response, 
            solution, 
            'Expected the solver to return the expected solution for an incomplete puzzle'
        )
    });

});