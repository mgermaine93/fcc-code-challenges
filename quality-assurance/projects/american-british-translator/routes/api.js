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
            console.log(`In the route: ${translator.getWords(inputText)}`);
            // do the american-to-british translation stuff in here
            if (inputLocale == "american-to-british") {
                console.log({
                    text: inputText,
                    locale: inputLocale,
                    translation: translator.americanToBritish(inputWords)
                });
                res.json({
                    text: inputText,
                    locale: inputLocale,
                    translation: translator.americanToBritish(inputWords)
                });
            // do the american-to-british-stuff translation in here
            } else if (inputLocale == "british-to-american") {
                console.log({
                    text: inputText,
                    locale: inputLocale,
                    translation: translator.americanToBritish(inputWords)
                });
                res.json({
                    text: inputText,
                    locale: inputLocale,
                    translation: translator.americanToBritish(inputWords)
                });
            }
        });

};