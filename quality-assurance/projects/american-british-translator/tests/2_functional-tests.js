const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

let translator = new Translator();

suite('Functional Tests', () => {

    // example set up from the metric-imperial converter 
    // test('Convert a valid input such as 10L: GET request to /api/convert.', (done) => {
    //     chai
    //         .request(server)
    //         .keepOpen()
    //         .get('/api/convert?input=10L')
    //         .end(function (err, res) {
    //             assert.equal(res.status, 200);
    //             assert.equal(res.text, '{"initNum":10,"initUnit":"L","returnNum":2.64172,"returnUnit":"gal","string":"10 liters converts to 2.64172 gallons"}');
    //             done();
    //         });
    // });

    // Translation with text and locale fields: POST request to /api/translate
    // Translation with text and invalid locale field: POST request to /api/translate
    // Translation with missing text field: POST request to /api/translate
    // Translation with missing locale field: POST request to /api/translate
    // Translation with empty text: POST request to /api/translate
    // Translation with text that needs no translation: POST request to /api/translate

});