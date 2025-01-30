const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {

    suite('tests for POST requests to /api/solve', function() {

        test('Solve a puzzle with valid puzzle string: POST request to /api/solve', (done) => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/solve?puzzle=82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51')
                .end(function (err, res) {
                    if (err) {
                        console.log(`There was an error: ${err}`);
                        res.done(err);
                    }
                    assert.equal(res.status, 200);
                    assert.property(res.body, 'solution', 'the response object for a solved puzzle with a valid puzzle string should include a "solution" property')
                    assert.deepEqual(res.body, '{"solution": "827549163531672894649831527496157382218396475753284916962415738185763249374928651"}', 'the response object for a solved puzzle with a valid puzzle string should contain a "solution" property with a value of the solved puzzle');
                    done();
            });
        });

        test('Solve a puzzle with missing puzzle string: POST request to /api/solve', (done) => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/solve?puzzle=')
                .end(function (err, res) {
                    if (err) {
                        console.log(`There was an error: ${err}`);
                        res.done(err);
                    }
                    assert.equal(res.status, 200);
                    assert.property(res.body, 'error', 'the response object for a solved puzzle with a missing puzzle string should include an "error" property')
                    assert.deepEqual(res.body, '{error: "Required field missing"}', 'the response object for a solved puzzle with a missing puzzle string should contain a "error" property with a value of "Required field missing"');
                    done();
            });
        });

        test('Solve a puzzle with invalid characters: POST request to /api/solve', (done) => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/solve?puzzle=82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28???')
                .end(function (err, res) {
                    if (err) {
                        console.log(`There was an error: ${err}`);
                        res.done(err);
                    }
                    assert.equal(res.status, 200);
                    assert.property(res.body, 'error', 'the response object for a solved puzzle with invalid characters should include an "error" property')
                    assert.deepEqual(res.body, '{error: "Invalid characters in puzzle"}', 'the response object for a solved puzzle with invalid characters should contain an "error" property with a value of "Invalid characters in puzzle"');
                    done();
            });
        });

        test('Solve a puzzle with incorrect length: POST request to /api/solve', (done) => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/solve?puzzle=..839.7.575.....964..1.......16.29846.9')
                .end(function (err, res) {
                    if (err) {
                        console.log(`There was an error: ${err}`);
                        res.done(err);
                    }
                    assert.equal(res.status, 200);
                    assert.property(res.body, 'error', 'the response object for a solved puzzle with incorrect length should include an "error" property')
                    assert.deepEqual(res.body, '{error: "Expected puzzle to be 81 characters long"}', 'the response object for a solved puzzle with invalid characters should contain an "error" property with a value of "Invalid characters in puzzle"');
                    done();
            });
        });

        test('Solve a puzzle that cannot be solved: POST request to /api/solve', (done) => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/solve?puzzle=5.3..7....6..195....98....6.8...6...34..8..3..17...2...6....28....419..5....8..79')
                .end(function (err, res) {
                    if (err) {
                        console.log(`There was an error: ${err}`);
                        res.done(err);
                    }
                    assert.equal(res.status, 200);
                    assert.property(res.body, 'error', 'the response object for a solved puzzle that cannot be solved should include an "error" property')
                    assert.deepEqual(res.body, '{ error: "Puzzle cannot be solved" }', 'the response object for a solved puzzle that cannot be solved should contain an "error" property with a value of "Puzzle cannot be solved"');
                    done();
            });
        });
    });

    suite('tests for POST requests to /api/check', function() {

        test('Check a puzzle placement with all fields: POST request to /api/check', (done) => {
            // chai
            //     .request(server)
            //     .keepOpen()
            //     .post('/api/solve?puzzle=5.3..7....6..195....98....6.8...6...34..8..3..17...2...6....28....419..5....8..79')
            //     .end(function (err, res) {
            //         if (err) {
            //             console.log(`There was an error: ${err}`);
            //             res.done(err);
            //         }
            //         assert.equal(res.status, 200);
            //         assert.property(res.body, 'error', 'the response object for a solved puzzle that cannot be solved should include an "error" property')
            //         assert.deepEqual(res.body, '{ error: "Puzzle cannot be solved" }', 'the response object for a solved puzzle that cannot be solved should contain an "error" property with a value of "Puzzle cannot be solved"');
            //         done();
            // });
            assert.fail();
            done();
        });

        test('Check a puzzle placement with single placement conflict: POST request to /api/check', (done) => {
            assert.fail();
            done();
        });

        test('Check a puzzle placement with multiple placement conflicts: POST request to /api/check', (done) => {
            assert.fail();
            done();
        });

        test('Check a puzzle placement with all placement conflicts: POST request to /api/check', (done) => {
            assert.fail();
            done();
        });

        test('Check a puzzle placement with missing required fields: POST request to /api/check', (done) => {
            assert.fail();
            done();
        });

        test('Check a puzzle placement with invalid characters: POST request to /api/check', (done) => {
            assert.fail();
            done();
        });

        test('Check a puzzle placement with incorrect length: POST request to /api/check', (done) => {
            assert.fail();
            done();
        });

        test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check', (done) => {
            assert.fail();
            done();
        });

        test('Check a puzzle placement with invalid placement value: POST request to /api/check', (done) => {
            assert.fail();
            done();
        });
    });

});