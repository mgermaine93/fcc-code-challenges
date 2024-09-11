const chai = require('chai');
const assert = chai.assert;

const server = require('../server');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

suite('Functional Tests', function() {

    test('Convert a valid input such as 10L: GET request to /api/convert.', (done) => {
        assert.fail();
        // chai
        //     .request(server)
        //     .keepOpen()
        //     .get('/api/convert?input=10L')
        //     .end(function (err, res) {
        //      assert.equal(res.status, 200);
        //      assert.equal(res.text, 'hello Guest');
        //     done();
        // });
    });

    test('Convert an invalid input such as 32g: GET request to /api/convert.', (done) => {
        assert.fail();
        // chai
        //     .request(server)
        //     .keepOpen()
        //     .get('/api/convert?input=32g')
        //     .end(function (err, res) {
        //      assert.equal(res.status, 200);
        //      assert.equal(res.text, 'hello Guest');
        //     done();
        // });
    });

    test('Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert.', (done) => {
        assert.fail();
        // chai
        //     .request(server)
        //     .keepOpen()
        //     .get('/api/convert?input=3/7.2/4kg')
        //     .end(function (err, res) {
        //      assert.equal(res.status, 200);
        //      assert.equal(res.text, 'hello Guest');
        //     done();
        // });
    });

    test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert.', (done) => {
        assert.fail();
        // chai
        //     .request(server)
        //     .keepOpen()
        //     .get('/api/convert?input=3/7.2/4kilomegagram')
        //     .end(function (err, res) {
        //      assert.equal(res.status, 200);
        //      assert.equal(res.text, 'hello Guest');
        //     done();
        // });
    });

    test('Convert with no number such as kg: GET request to /api/convert.', (done) => {
        assert.fail();
        // chai
        //     .request(server)
        //     .keepOpen()
        //     .get('/api/convert?input=kg')
        //     .end(function (err, res) {
        //      assert.equal(res.status, 200);
        //      assert.equal(res.text, 'hello Guest');
        //     done();
        // });
    });

});

