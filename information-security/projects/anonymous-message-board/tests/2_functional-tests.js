const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

    // Creating a new thread: POST request to /api/threads/{board}
    test('Creating a new thread: POST request to `/api/threads/{board}`', (done) => {
        assert.fail();
        done();
    });

    // Viewing the 10 most recent threads with 3 replies each: GET request to /api/threads/{board}
    test('Viewing the 10 most recent threads with 3 replies each: `GET request to /api/threads/{board}`', (done) => {
        assert.fail();
        done();
    });

    // Deleting a thread with the incorrect password: DELETE request to /api/threads/{board} with an invalid delete_password
    test('Deleting a thread with the incorrect password: DELETE request to `/api/threads/{board} with an invalid delete_password`', (done) => {
        assert.fail();
        done();
    });

    // Deleting a thread with the correct password: DELETE request to /api/threads/{board} with a valid delete_password
    test('Deleting a thread with the correct password: DELETE request to `/api/threads/{board} with a valid delete_password`', (done) => {
        assert.fail();
        done();
    });

    // Reporting a thread: PUT request to /api/threads/{board}
    test('Reporting a thread: PUT request to `/api/threads/{board}`', (done) => {
        assert.fail();
        done();
    });

    // Creating a new reply: POST request to /api/replies/{board}
    test('Creating a new reply: POST request to `/api/replies/{board}`', (done) => {
        assert.fail();
        done();
    });

    // Viewing a single thread with all replies: GET request to /api/replies/{board}
    test('Viewing a single thread with all replies: GET request to `/api/replies/{board}`', (done) => {
        assert.fail();
        done();
    });

    // Deleting a reply with the incorrect password: DELETE request to /api/replies/{board} with an invalid delete_password
    test('Deleting a reply with the incorrect password: DELETE request to `/api/replies/{board}` with an invalid delete_password', (done) => {
        assert.fail();
        done();
    });

    // Deleting a reply with the correct password: DELETE request to /api/replies/{board} with a valid delete_password
    test('Deleting a reply with the correct password: DELETE request to `/api/replies/{board} with a valid delete_password`', (done) => {
        assert.fail();
        done();
    });

    // Reporting a reply: PUT request to `/api/replies/{board}`
    test('Reporting a reply: PUT request to `/api/replies/{board}`', (done) => {
        assert.fail();
        done();
    });

});