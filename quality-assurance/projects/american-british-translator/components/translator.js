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
    getWords() {
        let splitInputText = this._text.split(" ");
        console.log(splitInputText);
        // https://www.geeksforgeeks.org/how-to-remove-all-line-breaks-from-a-string-using-javascript/#
        const splitInputTextWithWhitespaceAndNewlinesRemoved = [] 
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration#for...of_statement
        for (let word of splitInputText) {
            // https://www.geeksforgeeks.org/how-to-remove-all-line-breaks-from-a-string-using-javascript/
            let wordWithNewlinesRemoved = word.split(/[\r\n]+/).filter(Boolean).join('');
            splitInputTextWithWhitespaceAndNewlinesRemoved.push(wordWithNewlinesRemoved);
        }
        return splitInputTextWithWhitespaceAndNewlinesRemoved;
    }

    americanToBritish() {
        pass
    }

    britishToEnglish() {
        pass
    }
}

module.exports = Translator;