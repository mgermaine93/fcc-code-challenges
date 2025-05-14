const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

const MONGO_URL = process.env.MONGO_URL;

// set up the mongo DB connection
const { MongoClient, ObjectId } = require("mongodb");
const client = new MongoClient(MONGO_URL);
const database = client.db("anonymous-message-board");
const threads = database.collection("threads");

chai.use(chaiHttp);

let testThreadId;
let testReplyId;
const board = "fcc_test";
const text = "test text";
const deletePassword = "password";

suite('Functional Tests', function() {

    // Creating a new thread: POST request to /api/threads/{board}
    test('Creating a new thread: POST request to `/api/threads/{board}`', (done) => {        
        chai
            .request(server)
            .keepOpen()
            .post(`/api/threads/${board}`)
            .send({
                board: board,
                text: text,
                delete_password: deletePassword
            })
            .end(function (err, res) {
                if (err) {
                    console.log(`There an error: ${err}`);
                    res.done(err);
                }
                assert.equal(res.status, 200);
                assert.isString(res.body.insertedId);
                testThreadId = res.body.insertedId;
                done();
            })
    });

    // Creating a new reply: POST request to /api/replies/{board}
    test('Creating a new reply: POST request to `/api/replies/{board}`', (done) => {
        chai
            .request(server)
            .keepOpen()
            .put(`/api/replies/${board}`)
            .send({
                text: text,
                delete_password: deletePassword,
                thread_id: testThreadId,
            })
            .end(function (err, res) {
                console.log(res.body)
                if (err) {
                    console.log(`There an error: ${err}`);
                    res.done(err);
                }
                assert.equal(res.status, 200);
                assert.isString(res.body.insertedId);
                testReplyId = res.body.insertedId;
                done();
            })
    });

    // Viewing the 10 most recent threads with 3 replies each: GET request to /api/threads/{board}
    test('Viewing the 10 most recent threads with 3 replies each: `GET request to /api/threads/{board}`', (done) => {
        chai
            .request(server)
            .keepOpen()
            .get(`/api/threads/${board}`)
            .end(function (err, res) {
                if (err) {
                    console.log(`There an error: ${err}`);
                    res.done(err);
                }
                assert.equal(res.status, 200);
                assert.isObject(res.body[0]);
                assert.property(res.body[0], '_id');
                assert.property(res.body[0], 'text');
                assert.property(res.body[0], 'created_on');
                assert.property(res.body[0], 'board')
                assert.property(res.body[0], 'replies')
                done();
            })
    });


    // Viewing a single thread with all replies: GET request to /api/replies/{board}
    test('Viewing a single thread with all replies: GET request to `/api/replies/{board}`', (done) => {
        chai
            .request(server)
            .keepOpen()
            .get(`/api/replies/${board}`)
            .end(function (err, res) {
                if (err) {
                    console.log(`There an error: ${err}`);
                    res.done(err);
                }
                assert.equal(res.status, 200);
                assert.isObject(res.body[0]);
                assert.property(res.body[0], '_id');
                assert.property(res.body[0], 'text');
                assert.property(res.body[0], 'created_on');
                done();
            })
    });

    // Reporting a reply: PUT request to `/api/replies/{board}`
    test('Reporting a reply: PUT request to `/api/replies/{board}`', (done) => {
        chai
            .request(server)
            .keepOpen()
            .put(`/api/replies/${board}`)
            .send({
                thread_id: testThreadId,
                reply_id: testReplyId
            })
            .end(function (err, res) {
                if (err) {
                    console.log(`There an error: ${err}`);
                    res.done(err);
                }
                assert.equal(res.status, 200);
                assert.isString(res.text)
                assert.equal(res.text, "reported")
                done();
            })
    });

    // Reporting a thread: PUT request to /api/threads/{board}
    test('Reporting a thread: PUT request to `/api/threads/{board}`', (done) => {
        chai
            .request(server)
            .keepOpen()
            .put(`/api/threads/${board}`)
            .send({
                thread_id : testThreadId,
            })
            .end(function (err, res) {
                if (err) {
                    console.log(`There an error: ${err}`);
                    res.done(err);
                }
                assert.equal(res.status, 200);
                assert.isString(res.text)
                assert.equal(res.text, "reported")
                done();
            })
    });

    // Deleting a reply with the incorrect password: DELETE request to /api/replies/{board} with an invalid delete_password
    test('Deleting a reply with the incorrect password: DELETE request to `/api/replies/{board}` with an invalid delete_password', (done) => {
        chai
            .request(server)
            .keepOpen()
            .delete(`/api/replies/${board}`)
            .send({
                thread_id : new ObjectId(testThreadId),
                reply_id: new ObjectId(testReplyId),
                delete_password: "wrong password"
            })
            .end(function (err, res) {
                if (err) {
                    console.log(`There an error: ${err}`);
                    res.done(err);
                }
                assert.equal(res.status, 200);
                assert.isString(res.text)
                assert.equal(res.text, "incorrect password")
                done();
            })
    });

    // Deleting a reply with the correct password: DELETE request to /api/replies/{board} with a valid delete_password
    test('Deleting a reply with the correct password: DELETE request to `/api/replies/{board} with a valid delete_password`', (done) => {
        chai
            .request(server)
            .keepOpen()
            .delete(`/api/replies/${board}`)
            .send({
                thread_id: testThreadId,
                reply_id: testReplyId,
                delete_password: deletePassword
            })
            .end(function (err, res) {
                if (err) {
                    console.log(`There an error: ${err}`);
                    res.done(err);
                }
                assert.equal(res.status, 200);
                assert.isString(res.text)
                assert.equal(res.text, "success")
                done();
            })
    });

    // Deleting a thread with the incorrect password: DELETE request to /api/threads/{board} with an invalid delete_password
    test('Deleting a thread with the incorrect password: DELETE request to `/api/threads/{board} with an invalid delete_password`', (done) => {
        chai
            .request(server)
            .keepOpen()
            .delete(`/api/threads/${board}`)
            .send({
                thread_id : new ObjectId(testThreadId),
                delete_password: "wrong password"
            })
            .end(function (err, res) {
                if (err) {
                    console.log(`There an error: ${err}`);
                    res.done(err);
                }
                assert.equal(res.status, 200);
                assert.isString(res.text)
                assert.equal(res.text, "incorrect password")
                done();
            })
    });

    // Deleting a thread with the correct password: DELETE request to /api/threads/{board} with a valid delete_password
    test('Deleting a thread with the correct password: DELETE request to `/api/threads/{board} with a valid delete_password`', (done) => {
        chai
            .request(server)
            .keepOpen()
            .delete(`/api/threads/${board}`)
            .send({
                thread_id : testThreadId,
                delete_password: deletePassword
            })
            .end(function (err, res) {
                if (err) {
                    console.log(`There an error: ${err}`);
                    res.done(err);
                }
                assert.equal(res.status, 200);
                assert.isString(res.text)
                assert.equal(res.text, "success")
                done();
            })
    });

});