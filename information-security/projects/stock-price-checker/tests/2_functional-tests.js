const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {

    test('Viewing one stock: `GET` request to `/api/stock-prices/`', (done) => {
        assert.fail();
        done();
    });

    test('Viewing one stock and liking it: `GET` request to `/api/stock-prices/`', (done) => {
        assert.fail();
        done();
    });

    test('Viewing the same stock and liking it again: `GET` request to `/api/stock-prices/`', (done) => {
        assert.fail();
        done();
    });

    test('Viewing two stocks: `GET` request to `/api/stock-prices/`', (done) => {
        assert.fail();
        done();
    });

    test('Viewing two stocks and liking them: `GET` request to `/api/stock-prices/`', (done) => {
        assert.fail();
        done();
    });

});