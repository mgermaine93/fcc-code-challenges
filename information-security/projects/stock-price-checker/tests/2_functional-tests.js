const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {

    test('Viewing one stock: `GET` request to `/api/stock-prices/`', (done) => {
        const stock = "duol";
        chai
            .request(server)
            .keepOpen()
            .get(`/api/stock-prices?stock=${stock}`)
            .end(function (err, res) {
                if (err) {
                    console.log(`There was an error: ${err}`);
                    res.done(err);
                }
                assert.equal(res.status, 200);
                assert.isObject(res.body, 'the response should be an object')
                assert.property(res.body, 'stockData', 'the response object should have a property of "stockData"')
                assert.property(res.body.stockData, 'stock', 'the response object "stockData" should have a property of "stock"')
                assert.isString(res.body.stockData.stock, 'the "stock" property should be of type string')
                assert.property(res.body.stockData, 'price', 'the response object "stockData" should have a property of "price"')
                assert.isNumber(res.body.stockData.price, 'the "price" property should be of type number')
                assert.property(res.body.stockData, 'likes', 'the response object "stockData" should have a property of "likes"')
                assert.isNumber(res.body.stockData.likes, 'the "likes" property should be of type number')
                done();
            });
    });

    test('Viewing one stock and liking it: `GET` request to `/api/stock-prices/`', (done) => {
        const stock = "duol";
        chai
            .request(server)
            .keepOpen()
            .get(`/api/stock-prices?stock=${stock}&like=true`)
            .end(function (err, res) {
                if (err) {
                    console.log(`There was an error: ${err}`);
                    res.done(err);
                }
                assert.equal(res.status, 200);
                assert.isObject(res.body, 'the response should be an object')
                assert.property(res.body, 'stockData', 'the response object should have a property of "stockData"')
                assert.property(res.body.stockData, 'stock', 'the response object "stockData" should have a property of "stock"')
                assert.isString(res.body.stockData.stock, 'the "stock" property should be of type string')
                assert.property(res.body.stockData, 'price', 'the response object "stockData" should have a property of "price"')
                assert.isNumber(res.body.stockData.price, 'the "price" property should be of type number')
                assert.property(res.body.stockData, 'likes', 'the response object "stockData" should have a property of "likes"')
                assert.isNumber(res.body.stockData.likes, 'the "likes" property should be of type number')
                assert.isAbove(res.body.stockData.likes, 0, 'after liking a stock, the "likes" property should be greater than 0')
                done();
            });
    });

    test('Viewing the same stock and liking it again: `GET` request to `/api/stock-prices/`', (done) => {
        // TBD
        assert.fail();
        done();
    });

    test('Viewing two stocks: `GET` request to `/api/stock-prices/`', (done) => {
        const stock1 = "duol";
        const stock2 = "pcar";
        chai
            .request(server)
            .keepOpen()
            .get(`/api/stock-prices?stock=${stock1}&stock=${stock2}`)
            .end(function (err, res) {
                if (err) {
                    console.log(`There was an error: ${err}`);
                    res.done(err);
                }
                assert.equal(res.status, 200);
                assert.isObject(res.body, 'the response should be an object')
                assert.property(res.body, 'stockData', 'the response object should have a property of "stockData"')
                assert.isArray(res.body.stockData, 'the response object "stockData" should have a property that is of type array')
                assert.lengthOf(res.body.stockData, 'the response object "stockData" should have a property that is of type array and has a length of 2')
                assert.property(res.body.stockData[0], 'stock', 'the response object "stockData" should have a property of "stock"')
                assert.isString(res.body.stockData[0].stock, 'the "stock" property should be of type string')
                assert.property(res.body.stockData[0], 'price', 'the response object "stockData" should have a property of "price"')
                assert.isNumber(res.body.stockData[0].price, 'the "price" property should be of type number')
                assert.property(res.body.stockData[0], 'rel_likes', 'the response object "stockData" should have a property of "rel_likes"')
                assert.isNumber(res.body.stockData[0].rel_likes, 'the "rel_likes" property should be of type number')
                assert.property(res.body.stockData[1], 'stock', 'the response object "stockData" should have a property of "stock"')
                assert.isString(res.body.stockData[1].stock, 'the "stock" property should be of type string')
                assert.property(res.body.stockData[1], 'price', 'the response object "stockData" should have a property of "price"')
                assert.isNumber(res.body.stockData[1].price, 'the "price" property should be of type number')
                assert.property(res.body.stockData[1], 'rel_likes', 'the response object "stockData" should have a property of "rel_likes"')
                assert.isNumber(res.body.stockData[1].rel_likes, 'the "rel_likes" property should be of type number')
                done();
            });
    });

    test('Viewing two stocks and liking them: `GET` request to `/api/stock-prices/`', (done) => {
        const stock1 = "duol";
        const stock2 = "pcar";
        chai
            .request(server)
            .keepOpen()
            .get(`/api/stock-prices?stock=${stock1}&stock=${stock2}&like=true`)
            .end(function (err, res) {
                if (err) {
                    console.log(`There was an error: ${err}`);
                    res.done(err);
                }
                assert.equal(res.status, 200);
                assert.isObject(res.body, 'the response should be an object')
                assert.property(res.body, 'stockData', 'the response object should have a property of "stockData"')
                assert.isArray(res.body.stockData, 'the response object "stockData" should have a property that is of type array')
                assert.lengthOf(res.body.stockData, 'the response object "stockData" should have a property that is of type array and has a length of 2')
                assert.property(res.body.stockData[0], 'stock', 'the response object "stockData" should have a property of "stock"')
                assert.isString(res.body.stockData[0].stock, 'the "stock" property should be of type string')
                assert.property(res.body.stockData[0], 'price', 'the response object "stockData" should have a property of "price"')
                assert.isNumber(res.body.stockData[0].price, 'the "price" property should be of type number')
                assert.property(res.body.stockData[0], 'rel_likes', 'the response object "stockData" should have a property of "rel_likes"')
                assert.isNumber(res.body.stockData[0].rel_likes, 'the "rel_likes" property should be of type number')
                assert.isAbove(res.body.stockData[0].rel_likes, 0, 'after liking a stock, the "rel_likes" property should be greater than 0')
                assert.property(res.body.stockData[1], 'stock', 'the response object "stockData" should have a property of "stock"')
                assert.isString(res.body.stockData[1].stock, 'the "stock" property should be of type string')
                assert.property(res.body.stockData[1], 'price', 'the response object "stockData" should have a property of "price"')
                assert.isNumber(res.body.stockData[1].price, 'the "price" property should be of type number')
                assert.property(res.body.stockData[1], 'rel_likes', 'the response object "stockData" should have a property of "rel_likes"')
                assert.isNumber(res.body.stockData[1].rel_likes, 'the "rel_likes" property should be of type number')
                assert.isAbove(res.body.stockData[1].rel_likes, 0, 'after liking a stock, the "rel_likes" property should be greater than 0')
                assert.deepEqual(res.body.stockData[0].rel_likes + res.body.stockData[1].rel_likes, 0, 'the sum of the rel_likes of both stocks should be 0')
                done();
            });
    });

});