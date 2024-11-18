'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {

    // complete this route
    app.route('/api/translate')
        .post((req, res) => {
            console.log("In the route")
            const translator = new Translator(req.body.text, req.body.locale);
            const inputText = translator.text;
            const inputLocale = translator.locale;
            const inputWords = translator.getWords(inputText);
            console.log(`In the route: ${translator.getWords(inputText)}`)
            res.json({
                text: inputText,
                translation: translator.americanToBritish(inputWords)
            })
            // console.log(translator.locale);
        });
};