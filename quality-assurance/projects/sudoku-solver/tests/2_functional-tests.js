const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {

    suite('tests for POST requests to /api/solve', function() {

        test('Solve a puzzle with valid puzzle string: POST request to /api/solve', (done) => {
            const puzzle = '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51';
            const solution = "827549163531672894649831527496157382218396475753284916962415738185763249374928651";
            chai
                .request(server)
                .keepOpen()
                .post(`/api/solve`)
                .send({puzzle: puzzle})
                .end(function (err, res) {
                    if (err) {
                        console.log(`There was an error: ${err}`);
                        res.done(err);
                    }
                    assert.equal(res.status, 200);
                    assert.property(
                        // expected
                        res.body, 
                        // actual
                        'solution', 
                        // message
                        'the response object for a solved puzzle with a valid puzzle string should include a "solution" property'
                    )
                    assert.deepEqual(
                        res.body, 
                        {solution: solution}, 
                        'the response object for a solved puzzle with a valid puzzle string should contain a "solution" property with a value of the solved puzzle'
                    );
                    done();
            });
        });

        test('Solve a puzzle with missing puzzle string: POST request to /api/solve', (done) => {
            const missingPuzzle = '';
            chai
                .request(server)
                .keepOpen()
                .post('/api/solve')
                .send({puzzle: missingPuzzle})
                .end(function (err, res) {
                    if (err) {
                        console.log(`There was an error: ${err}`);
                        res.done(err);
                    }
                    assert.equal(res.status, 200);
                    assert.property(
                        res.body, 
                        'error', 
                        'the response object for a solved puzzle with a missing puzzle string should include an "error" property'
                    )
                    assert.deepEqual(
                        res.body, 
                        {error: "Required field missing"}, 
                        'the response object for a solved puzzle with a missing puzzle string should contain a "error" property with a value of "Required field missing"'
                    );
                    done();
            });
        });

        test('Solve a puzzle with invalid characters: POST request to /api/solve', (done) => {
            const invalidPuzzle = '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28???';
            chai
                .request(server)
                .keepOpen()
                .post('/api/solve')
                .send({puzzle: invalidPuzzle})
                .end(function (err, res) {
                    if (err) {
                        console.log(`There was an error: ${err}`);
                        res.done(err);
                    }
                    assert.equal(res.status, 200);
                    assert.property(
                        res.body, 
                        'error', 
                        'the response object for a solved puzzle with invalid characters should include an "error" property'
                    )
                    assert.deepEqual(
                        res.body, 
                        {error: "Invalid characters in puzzle"}, 
                        'the response object for a solved puzzle with invalid characters should contain an "error" property with a value of "Invalid characters in puzzle"'
                    );
                    done();
            });
        });

        test('Solve a puzzle with incorrect length: POST request to /api/solve', (done) => {
            const incorrectLengthPuzzle = '..839.7.575.....964..1.......16.29846.9';
            chai
                .request(server)
                .keepOpen()
                .post('/api/solve')
                .send({puzzle: incorrectLengthPuzzle})
                .end(function (err, res) {
                    if (err) {
                        console.log(`There was an error: ${err}`);
                        res.done(err);
                    }
                    assert.equal(res.status, 200);
                    assert.property(
                        res.body, 
                        'error', 
                        'the response object for a solved puzzle with incorrect length should include an "error" property'
                    )
                    assert.deepEqual(
                        res.body, 
                        {error: "Expected puzzle to be 81 characters long"}, 
                        'the response object for a solved puzzle with invalid characters should contain an "error" property with a value of "Invalid characters in puzzle"'
                    );
                    done();
            });
        });

        test('Solve a puzzle that cannot be solved: POST request to /api/solve', (done) => {
            const impossiblePuzzle = '5.3..7....6..195....98....6.8...6...34..8..3..17...2...6....28....419..5....8..79';
            chai
                .request(server)
                .keepOpen()
                .post('/api/solve')
                .send({puzzle: impossiblePuzzle})
                .end(function (err, res) {
                    if (err) {
                        console.log(`There was an error: ${err}`);
                        res.done(err);
                    }
                    assert.equal(res.status, 200);
                    assert.property(
                        res.body, 
                        'error', 
                        'the response object for a solved puzzle that cannot be solved should include an "error" property'
                    )
                    assert.deepEqual(
                        res.body, 
                        { error: "Puzzle cannot be solved" }, 
                        'the response object for a solved puzzle that cannot be solved should contain an "error" property with a value of "Puzzle cannot be solved"'
                    );
                    done();
            });
        });
    });

    suite('tests for POST requests to /api/check', function() {
        
        test('Check a puzzle placement with all fields: POST request to /api/check', (done) => {
            const puzzle = '..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1';
            const coordinate = 'A1';
            const value = '2';
            chai
                .request(server)
                .keepOpen()
                .post('/api/check')
                .send({
                    puzzle: puzzle,
                    coordinate: coordinate,
                    value: value
                })
                .end(function (err, res) {
                    if (err) {
                        console.log(`There was an error: ${err}`);
                        res.done(err);
                    }
                    assert.equal(res.status, 200);
                    assert.property(
                        res.body, 
                        'valid', 
                        'the response object for a checked puzzle placement cell should include a property of "valid"'
                    )
                    assert.deepEqual(
                        res.body, 
                        { valid: true }, 
                        'the response object for a checked puzzle placement cell should include a property of "valid" with a boolean value of true');
                    done();
            });
        });

        test('Check a puzzle placement with single placement conflict: POST request to /api/check', (done) => {
            const puzzle = '..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1';
            const coordinate = 'A1';
            const value = '6';
            chai
                .request(server)
                .keepOpen()
                .post('/api/check')
                .send({
                    puzzle: puzzle,
                    coordinate: coordinate,
                    value: value
                })
                .end(function (err, res) {
                    if (err) {
                        console.log(`There was an error: ${err}`);
                        res.done(err);
                    }
                    assert.equal(res.status, 200);
                    assert.property(
                        res.body, 
                        'valid', 
                        'the response object for a checked puzzle placement cell with a single placement conflict should include a property of "valid"'
                    )
                    assert.property(
                        res.body, 
                        'conflict', 
                        'the response object for a checked puzzle placement cell with a single placement conflict should include a property of "conflict"'
                    )
                    assert.deepEqual(
                        res.body, 
                        { valid: false, conflict: [ "column" ] }, 
                        'the response object for a checked puzzle placement cell with a single placement conflict should include a property of "valid" with a boolean value of false and a property of "conflict" with a value that is an array with a length of one');
                    done();
            });
        });

        test('Check a puzzle placement with multiple placement conflicts: POST request to /api/check', (done) => {
            const puzzle = '..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1';
            const coordinate = 'A1';
            const value = '5';
            chai
                .request(server)
                .keepOpen()
                .post('/api/check')
                .send({
                    puzzle: puzzle,
                    coordinate: coordinate,
                    value: value
                })
                .end(function (err, res) {
                    if (err) {
                        console.log(`There was an error: ${err}`);
                        res.done(err);
                    }
                    assert.equal(res.status, 200);
                    assert.property(
                        res.body, 
                        'valid', 
                        'the response object for a checked puzzle placement cell with multiple placement conflicts should include a property of "valid"'
                    )
                    assert.property(
                        res.body, 
                        'conflict', 
                        'the response object for a checked puzzle placement cell with multiple placement conflicts should include a property of "conflict"'
                    )
                    assert.deepEqual(
                        res.body, 
                        { valid: false, conflict: [ "row", "region" ] }, 
                        'the response object for a checked puzzle placement cell with multiple placement conflicts should include a property of "valid" with a boolean value of false and a property of "conflict" with a value that is an array'
                    );
                    assert.isAtLeast(
                        res.body.conflict.length,
                        2,
                        'the response object for a checked puzzle placement cell with multiple placement conflicts should include a property of "conflict" that is an array with a length of at least 2'
                    )
                    done();
            });
        });

        test('Check a puzzle placement with all placement conflicts: POST request to /api/check', (done) => {
            const puzzle = '..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1';
            const coordinate = 'E4';
            const value = '3';
            chai
                .request(server)
                .keepOpen()
                .post('/api/check')
                .send({
                    puzzle: puzzle,
                    coordinate: coordinate,
                    value: value
                })
                .end(function (err, res) {
                    if (err) {
                        console.log(`There was an error: ${err}`);
                        res.done(err);
                    }
                    assert.equal(res.status, 200);
                    assert.property(
                        res.body, 
                        'valid', 
                        'the response object for a checked puzzle placement cell with all placement conflicts should include a property of "valid"'
                    )
                    assert.property(
                        res.body, 
                        'conflict', 
                        'the response object for a checked puzzle placement cell with all placement conflicts should include a property of "conflict"'
                    )
                    assert.deepEqual(
                        res.body, 
                        { "valid": false, "conflict": [ "row", "column", "region" ] }, 
                        'the response object for a checked puzzle placement cell with all placement conflicts should include a property of "valid" with a boolean value of false and a property of "conflict" with a value that is an array'
                    );
                    assert.deepEqual(
                        res.body.conflict.length,
                        3,
                        'the response object for a checked puzzle placement cell with multiple placement conflicts should include a property of "conflict" that is an array with a length of 3'
                    )
                    done();
            });
        });

        test('Check a puzzle placement with missing required fields: POST request to /api/check', (done) => {
            const puzzle = '..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1';
            chai
                .request(server)
                .keepOpen()
                .post('/api/check')
                .send({
                    puzzle: puzzle,
                })
                .end(function (err, res) {
                    if (err) {
                        console.log(`There was an error: ${err}`);
                        res.done(err);
                    }
                    assert.equal(res.status, 200);
                    assert.property(
                        res.body, 
                        'error', 
                        'the response object for a checked puzzle placement cell with missing required fields should include a property of "error"'
                    )
                    assert.deepEqual(
                        res.body, 
                        { error: "Required field(s) missing" }, 
                        'the response object for a checked puzzle placement cell with missing required fields should include a property of "error" with value of "Required field(s) missing"'
                    );
                    done();
            });
        });

        test('Check a puzzle placement with invalid characters: POST request to /api/check', (done) => {
            const puzzle = '..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...?';
            const coordinate = 'A1';
            const value = '2';
            chai
                .request(server)
                .keepOpen()
                .post('/api/check')
                .send({
                    puzzle: puzzle,
                    coordinate: coordinate,
                    value: value
                })
                .end(function (err, res) {
                    if (err) {
                        console.log(`There was an error: ${err}`);
                        res.done(err);
                    }
                    assert.equal(res.status, 200);
                    assert.property(
                        res.body, 
                        'error', 
                        'the response object for a checked puzzle placement with invalid characters should include a property of "error"'
                    )
                    assert.deepEqual(
                        res.body, 
                        { error: "Invalid characters in puzzle" }, 
                        'the response object for a checked puzzle placement with invalid characters should include a property of "error" with a value of "Invalid characters in puzzle"');
                    done();
            });
        });

        test('Check a puzzle placement with incorrect length: POST request to /api/check', (done) => {
            const puzzle = '..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492';
            const coordinate = 'A1';
            const value = '2';
            chai
                .request(server)
                .keepOpen()
                .post('/api/check')
                .send({
                    puzzle: puzzle,
                    coordinate: coordinate,
                    value: value
                })
                .end(function (err, res) {
                    if (err) {
                        console.log(`There was an error: ${err}`);
                        res.done(err);
                    }
                    assert.equal(res.status, 200);
                    assert.property(
                        res.body, 
                        'error', 
                        'the response object for a checked puzzle placement with invalid characters should include a property of "error"'
                    )
                    assert.deepEqual(
                        res.body, 
                        { error: "Expected puzzle to be 81 characters long" }, 
                        'the response object for a checked puzzle placement with invalid characters should include a property of "error" with a value of "Expected puzzle to be 81 characters long"');
                    done();
            });
        });

        test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check', (done) => {
            const puzzle = '..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1';
            const coordinate = 'M4';
            const value = '3';
            chai
                .request(server)
                .keepOpen()
                .post('/api/check')
                .send({
                    puzzle: puzzle,
                    coordinate: coordinate,
                    value: value
                })
                .end(function (err, res) {
                    if (err) {
                        console.log(`There was an error: ${err}`);
                        res.done(err);
                    }
                    assert.equal(res.status, 200);
                    assert.property(
                        res.body, 
                        'error', 
                        'the response object for a checked puzzle placement with invalid placement coordinates should include a property of "error"'
                    )
                    assert.deepEqual(
                        res.body, 
                        { "error": "Invalid coordinate" }, 
                        'the response object for a checked puzzle placement with invalid placement coordinates should include a property of "error" with a value of "Invalid coordinate"'
                    );
                    done();
            });
        });

        test('Check a puzzle placement with invalid placement value: POST request to /api/check', (done) => {
            const puzzle = '..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1';
            const coordinate = 'A1';
            const value = 'M';
            chai
                .request(server)
                .keepOpen()
                .post('/api/check')
                .send({
                    puzzle: puzzle,
                    coordinate: coordinate,
                    value: value
                })
                .end(function (err, res) {
                    if (err) {
                        console.log(`There was an error: ${err}`);
                        res.done(err);
                    }
                    assert.equal(res.status, 200);
                    assert.property(
                        res.body, 
                        'error', 
                        'the response object for a checked puzzle placement with an invalid placement value should include a property of "error"'
                    )
                    assert.deepEqual(
                        res.body, 
                        { "error": "Invalid value" }, 
                        'the response object for a checked puzzle placement with an invalid placement value should include a property of "error" with a value of "Invalid coordinate"'
                    );
                    done();
            });
        });
    });

});