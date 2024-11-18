const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

// all logic goes in here
class Translator {

    constructor(text, locale) {
        this._text = text;
        this._locale = locale;
    }

    // getters
    get text() {
        return this._text;
    }
    get locale() {
        return this._locale;
    }

    // methods

    // need to somehow filter all of the words out of the input string (since characters, whitespace, etc., don't translate)
    // if translatable words are not surrounded by whitespace, than we don't need to translate them.
    // newlines count as whitespace
    getWords() {
        // this split matches spaces, tabs, AND newlines
        let splitInputText = this._text.split(/\s+/);
        console.log(splitInputText);
        // // https://www.geeksforgeeks.org/how-to-remove-all-line-breaks-from-a-string-using-javascript/#
        // const splitInputTextWithWhitespaceAndNewlinesRemoved = [] 
        // // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration#for...of_statement
        // for (let word of splitInputText) {
        //     // https://www.geeksforgeeks.org/how-to-remove-all-line-breaks-from-a-string-using-javascript/
        //     let wordWithNewlinesRemoved = word.split(/\s+/).filter(Boolean).join('');
        //     splitInputTextWithWhitespaceAndNewlinesRemoved.push(wordWithNewlinesRemoved);
        // }
        // return splitInputTextWithWhitespaceAndNewlinesRemoved;
        return splitInputText
    }

    americanToBritish(words) {
        // take in a list of words (via the method above)
        // sometimes need to account for multiple words at once (phrases like "blood sausage", etc.)
        let translatedWords = []
        for (let americanWord of words) {
            translatedWords.push(americanWord);
        }
        return translatedWords
    }

    britishToEnglish() {
        // take in a list of words (via the method above)
        // sometimes need to account for multiple words at once (phrases like "blood sausage", etc.)
        let translatedWords = []
        for (let britishWord of words) {
            translatedWords.push(britishWord);
        }
        return translatedWords
    }
}

module.exports = Translator;