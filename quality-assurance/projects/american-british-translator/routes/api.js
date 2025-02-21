'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {

    const translator = new Translator();

    // complete this route
    app.route('/api/translate')

        .post((req, res) => {

            console.log("In the route")
            
            const inputText = req.body.text || '';
            const inputLocale = req.body.locale || '';
            // translator.setText(inputText)
            // translator.setLocale(inputLocale)
            
            // const words = translator.getWords(inputText)
            // console.log(`Words right at the start of the API routing: ${typeof(words)}`)
            let numMissingFields = 0;

            // If one or more of the required fields is missing, return { error: 'Required field(s) missing' }
            if (!req.body.hasOwnProperty('locale')) {
                numMissingFields++;
            }
            if (!req.body.hasOwnProperty('text')) {
                numMissingFields++;
            }
            if (numMissingFields > 0) {
                res.send({
                    error: 'Required field(s) missing'
                });
            }
            else if (!inputText || inputLocale !== "american-to-british" && inputLocale !== "british-to-american") {
                // If text is empty, return { error: 'No text to translate' }
                if (!inputText) {
                    res.send({
                        error: "No text to translate"
                    });
                // If locale does not match one of the two specified locales, return { error: 'Invalid value for locale field' }
                } else if (inputLocale !== "american-to-british" && inputLocale !== "british-to-american") {
                    res.send({
                        error: 'Invalid value for locale field' 
                    });
                } else {
                    res.send({
                        error: 'Required field(s) missing'
                    });
                }
            } else {
                // do the american-to-british translation stuff in here
                if (inputLocale == "american-to-british") {
                    // console.log(`words from the route: ${words}`)
                    const translation = translator.americanToBritish(inputText)
                    console.log({
                        text: inputText,
                        locale: inputLocale,
                        translation: translation
                    });
                    res.json({
                        text: inputText,
                        // locale: inputLocale,
                        translation: translation
                    });
                // do the american-to-british-stuff translation in here
                } else if (inputLocale == "british-to-american") {
                    const translation = translator.britishToAmerican(inputText);
                    console.log({
                        text: inputText,
                        locale: inputLocale,
                        translation: translation
                    });
                    res.json({
                        text: inputText,
                        // locale: inputLocale,
                        translation: translation
                    });
                }
            }
        });

};