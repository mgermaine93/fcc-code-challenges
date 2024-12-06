const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

// all logic goes in here
class Translator {

    constructor(text = null, locale = null, highlight = true) {
        this.text = text;
        this.locale = locale;
        this.highlight = highlight;
        this.translation = null;
    }

    setText(text) {
        if (text) {
            this.text = text;
        }
    }

    setLocale(locale) {
        if (locale) {
            this.locale = locale;
        }
    }

    // methods

    // need to somehow filter all of the words out of the input string (since characters, whitespace, etc., don't translate)
    // if translatable words are not surrounded by whitespace, than we don't need to translate them.
    // newlines count as whitespace
    getWords(text) {
        // this split matches spaces, tabs, AND newlines
        let splitInputText = text.split(/\s+/);
        console.log(splitInputText);
        return splitInputText
    }

    americanToBritish(words) {
        // take in a list of words (via the method above)
        // sometimes need to account for multiple words at once (phrases like "blood sausage", etc.)
        let translatedWords = []
        for (let americanWord of words) {
            let loweredAmericanWord = americanWord.toLowerCase()
            console.log(`Here is a word: ${americanWord}`)
            // need to get all of the keys in the object
            // then split the keys on whitespace
            let translatedWord;
            // check if the american word is in the keys to "american only"
            if (loweredAmericanWord in americanOnly) {
                let britishTranslation = americanOnly[loweredAmericanWord]
                // translatedWords.push(britishTranslation)
                translatedWord = britishTranslation
            }
            // check if the american word is in the keys to the "american to british spelling"
            else if (loweredAmericanWord in americanToBritishSpelling) {
                let britishSpelling = americanToBritishSpelling[loweredAmericanWord]
                // translatedWords.push(britishSpelling)
                translatedWord = britishSpelling
            }
            // check if the american word is in the keys to "american to british titles"
            else if (loweredAmericanWord in americanToBritishTitles) {
                let britishTitle = americanToBritishTitles[loweredAmericanWord]
                let capitalizedBritishTitle = britishTitle.charAt(0).toUpperCase() + britishTitle.slice(1);
                // translatedWords.push(capitalizedBritishTitle)
                translatedWord = capitalizedBritishTitle
            }
            else {
                translatedWord = loweredAmericanWord;
            }
            
            // always capitalize the first letter of the first word when its returned, unless it's translated
            if (words[0] == americanWord) {
                translatedWord = translatedWord.charAt(0).toUpperCase() + translatedWord.slice(1);
                translatedWords.push(translatedWord)
            } else {
                translatedWords.push(loweredAmericanWord);
            }
        }
        return translatedWords.join(" ")
    }

    britishToAmerican(words) {
        // take in a list of words (via the method above)
        // sometimes need to account for multiple words at once (phrases like "blood sausage", etc.)
        let translatedWords = []

        for (let i = 0; i < words.length; i++) {
            console.log(`Here is i at the very start: ${i}`)
            let loweredBritishWord = words[i].toLowerCase();
            console.log(`Here is a word: ${loweredBritishWord}`);
            let splitKeys = Object.keys(britishOnly).map(key => key.split(" "));

            let listIndex;
            let innerListIndex;

            let result = splitKeys.some((innerList, j) => {
                let innerIndex = innerList.indexOf(loweredBritishWord);
                if (innerIndex !== -1) {
                    console.log(`Found ${loweredBritishWord} at index [${j}][${innerIndex}] in ${innerList}`);
                    listIndex = j;
                    innerListIndex = innerIndex;
                    return true;
                }
                return false;
            })

            if (result) {
                console.log(`i = ${i}`)
            }
            // if (result) {
            //     console.log(`Here is i: ${i}`)
            //     console.log(splitKeys[listIndex])
            //     let placeholder = i
            //     for (let h = 0; h < splitKeys[listIndex].length; h++) {
            //         console.log(splitKeys[listIndex][h])
            //         console.log(`i is this: ${i}, h is this: ${h}, i+=h is this: ${i+h}`)
            //         console.log(`User input: ${words}, ${splitKeys[listIndex][h]}, ${words[i+h]}`)
            //         // if (words[i+=h] !== splitKeys[listIndex][h]) {
            //         //     console.log("No go")
            //         // } else {
            //         //     console.log("Go")
            //         // }
            //     }
            //     // translatedWords.push(splitKeys.join(" "));
            //     // i += splitKeys[listIndex].length;
            // }

            // console.log(`Here is the result of the some function: ${result}, ${placeholder}`)
        }

        return translatedWords
        // for (let britishWord of words) {
        //     let loweredBritishWord = britishWord.toLowerCase()
        //     console.log(`Here is a word: ${loweredBritishWord}`)
        //     let splitKeys = Object.keys(britishOnly).map(key => key.split(" "))
        //     let match = splitKeys.some((innerList, i) => {
        //         let innerIndex = innerList.indexOf(loweredBritishWord);
        //         if (innerIndex !== -1) {
        //             console.log(`Found ${match} at index [${i}][${innerIndex}]`)
        //         }
        //     })
        //     // console.log(splitKeys)
        //     // // check if the american word is in the keys to "american only"
        //     // if (loweredBritishWord in britishOnly) {
        //     //     let americanTranslation = britishOnly[loweredBritishWord]
        //     //     translatedWords.push(americanTranslation)
        //     // }
        //     // // check if the american word is in the keys to the "american to british spelling"
        //     // else if (loweredBritishWord in Object.americanToBritishSpelling.values()) {
        //     //     let americanSpelling = Object.keys(americanToBritishSpelling).find(key => americanToBritishSpelling[key] === loweredBritishWord);
        //     //     translatedWords.push(americanSpelling)
        //     // }
        //     // // check if the american word is in the keys to "american to british titles"
        //     // else if (loweredBritishWord in Object.americanToBritishTitles.values()) {
        //     //     let americanTitle = Object.keys(americanToBritishTitles).find(key => americanToBritishTitles[key] === loweredBritishWord);
        //     //     let capitalizedAmericanTitle = americanTitle.charAt(0).toUpperCase() + americanTitle.slice(1);
        //     //     translatedWords.push(capitalizedAmericanTitle)
        //     // }
        //     // else {
        //     //     translatedWords.push(loweredBritishWord);
        //     // }
        // }
        // return translatedWords.join(" ")
    }
}

module.exports = Translator;