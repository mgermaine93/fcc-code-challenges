const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

// let Translator = require('../components/translator.js');

// let translator = new Translator();

suite('Functional Tests', () => {

    test('Translation with valid text and locale fields: POST request to /api/translate', (done) => {
        const text = 'Mangoes are my favorite fruit.';
        const locale = 'american-to-british';
        const translation = 'Mangoes are my <span class=\"highlight\">favourite</span> fruit.';
        chai
            .request(server)
            .keepOpen()
            .post('/api/translate')
            .send({
                text: text,
                locale: locale
            })
            .end(function (err, res) {
                if (err) {
                    console.log(`There was an error: ${err}`);
                    res.done(err);
                }
                assert.equal(
                    res.status, 
                    200
                );
                assert.property(
                    // expected
                    res.body, 
                    // actual
                    'text', 
                    // message
                    'the response of a successful POST request with valid "text" and "locale" values should have a property of "text"'
                );
                assert.property(
                    res.body, 
                    'translation', 
                    'the response of a successful POST request with valid "text" and "locale" values should have a property of "translation"'
                );
                assert.deepEqual(
                    res.body, 
                    {
                        text: text,
                        translation: translation
                    },
                    `the POST request should successfully translate user-input when valid text and locale fields are provided: ${res.body}`
                );
                done();
            });
    });

    test('Translation with valid text and invalid locale field: POST request to /api/translate', (done) => {
        const text = 'Mangoes are my favorite fruit.';
        const invalidLocale = '';
        chai
            .request(server)
            .keepOpen()
            .post('/api/translate')
            .send({
                text: text,
                locale: invalidLocale
            })
            .end(function (err, res) {
                if (err) {
                    console.log(`There was an error: ${err}`);
                    res.done(err);
                }
                assert.equal(
                    res.status, 
                    200
                );
                assert.property(
                    res.body, 
                    'error', 
                    'the response of a successful POST request with an invalid "locale" value should have a property of "error"'
                );
                assert.deepEqual(
                    res.body, 
                    {
                        error: 'Invalid value for locale field'
                    },
                    'the response of a successful POST request with an invalid "locale" value should be { error: "Invalid value for locale field" }'
                );
                done();
            });
    });

    test('Translation with missing text field: POST request to /api/translate', (done) => {
        let missingTextField;
        const locale = 'american-to-british';
        chai
            .request(server)
            .keepOpen()
            .post('/api/translate')
            .send({
                text: missingTextField,
                locale: locale
            })
            .end(function (err, res) {
                if (err) {
                    console.log(`There was an error: ${err}`);
                    res.done(err);
                }
                assert.equal(
                    res.status, 
                    200
                );
                assert.property(
                    res.body, 
                    'error', 
                    'the response of a successful POST request with an empty "text" value should have a property of "error"'
                );
                assert.deepEqual(
                    res.body, 
                    {
                        error: 'Required field(s) missing' 
                    },
                    'the response of a successful POST request with an empty "text" value should be { error: "Required field(s) missing" }'
                );
                done();
            });
    });

    test('Translation with missing locale field: POST request to /api/translate', (done) => {
        const text = 'Mangos are my favorite fruit';
        const missingLocaleField = '';
        chai
            .request(server)
            .keepOpen()
            .post('/api/translate')
            .send({
                text: text,
                locale: missingLocaleField
            })
            .end(function (err, res) {
                if (err) {
                    console.log(`There was an error: ${err}`);
                    res.done(err);
                }
                assert.equal(
                    res.status, 
                    200
                );
                assert.property(
                    res.body, 
                    'error', 
                    'the response of a successful POST request with an empty "locale" value should have a property of "error"'
                );
                assert.deepEqual(
                    res.body, 
                    {
                        error: 'Invalid value for locale field'
                    },
                    'the response of a successful POST request with an empty "locale" value should be { error: "Invalid value for locale field"'
                );
                done();
            });
    });

    test('Translation with empty text: POST request to /api/translate', (done) => {
        const emptyTextField = '';
        const locale = 'american-to-british';
        chai
            .request(server)
            .keepOpen()
            .post('/api/translate')
            .send({
                text: emptyTextField,
                locale: locale
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
                    'the response of a successful POST request with an empty "text" value should have a property of "error"'
                );
                assert.deepEqual(
                    res.body, 
                    {
                        error: 'No text to translate'
                    },
                    'the response of a successful POST request with an empty "locale" value should be { error: "No text to translate" }'
                );
                done();
            });
    });

    test('Translation with text that needs no translation: POST request to /api/translate', (done) => {
        const allGoodText = 'Let\'s go Red Wings!';
        const locale = 'american-to-british';
        const translation = "Everything looks good to me!";
        chai
            .request(server)
            .keepOpen()
            .post('/api/translate')
            .send({
                text: allGoodText,
                locale: locale
            })
            .end(function (err, res) {
                if (err) {
                    console.log(`There was an error: ${err}`);
                    res.done(err);
                }
                assert.equal(res.status, 200);
                assert.property(
                    res.body, 
                    'text', 
                    'the response of a successful POST request with text that needs no translation should have a property of "text"'
                );
                assert.property(
                    res.body, 
                    'translation', 
                    'the response of a successful POST request with text that needs no translation should have a property of "translation"'
                );
                assert.deepEqual(
                    res.body, 
                    { 
                        text: allGoodText,
                        translation: translation
                    },
                    'the response of a successful POST request with text that needs no translation should have a "translation" value of "Everything looks good to me!"'
                );
                done();
            });
    });

});