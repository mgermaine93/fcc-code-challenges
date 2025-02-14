const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require('./british-only.js');

const americanOnlyWords = (Object.keys(americanOnly)).map(str => str.split(" "));
const britishOnlyWords = (Object.keys(britishOnly)).map(str => str.split(" "));

function highlight(wordOrPhrase) {
    return `<span class="highlight">${wordOrPhrase}</span>`;
}

function findAllWordIndices(word, listOfLists) {
    let indices = []
    for (let h = 0; h < listOfLists.length; h++) {
        if (listOfLists[h].includes(word)) {
            indices.push(h)
        }
    }
    return indices
}

function hasPeriods(word) {
    if (word.startsWith(".") && word.endsWith(".")) {
        return 3
    } else if (word.startsWith(".")) {
        return 2
    } else if (word.endsWith(".")) {
        return 1
    } else {
        return 0
    }
}

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
        // the regex also explicitly allows hyphens and apostrophes
        let splitInputText = text.split(/[^\w'-.]+/);
        return splitInputText
    }

    americanToBritish(words) {
        // take in a list of words (via the method above)
        // sometimes need to account for multiple words at once (phrases like "blood sausage", etc.)
        let translatedWords = []
        // iterate through the words that the user originally entered
        for (let i = 0; i < words.length; i++) {
            let translatedWord;
            let americanWord = words[i].toLowerCase();
            console.log(`Here is a word: ${americanWord}`)
            // need to handle periods...
            if (americanWord in americanToBritishTitles) {
                console.log(`American to british titles: ${americanWord}`)
                let britishTitle = americanToBritishTitles[americanWord]
                let capitalizedBritishTitle = britishTitle.charAt(0).toUpperCase() + britishTitle.slice(1);
                translatedWord = capitalizedBritishTitle
                console.log(translatedWord)
            } else {
                if (americanWord.endsWith(".")) {
                    console.log("starts with and/or ends with a period")
                    // if it ends with a period, then just try to translate it (without the period)
                    const splitPeriodWord = americanWord.match(/\.|[^.]+/g);

                }

                let americanIndex = findAllWordIndices(americanWord, americanOnlyWords)
                console.log(americanIndex, typeof(americanIndex))
                if (americanIndex.length > 0) {
                    let k = i;
                    let possibleMatch = americanOnlyWords[americanIndex[0]];
                    console.log(`Possible match: ${possibleMatch}, ${typeof(possibleMatch)}`)
                    let possibleMatchLength = possibleMatch.length;
                    let placeholder = true
                    for (let j = 0; j < possibleMatchLength; j++) {
                        let loweredWord = words[k].toLowerCase();
                        console.log(`${loweredWord}, ${possibleMatch[j]}`)
                        if (loweredWord !== possibleMatch[j]) {
                            placeholder = false
                            // break
                        } else {
                            k++;
                        }
                    }
                    if (placeholder) {
                        console.log("Long string has been matched");
                        let americanPhrase = americanOnlyWords[americanIndex].join(" ");
                        console.log(americanPhrase);
                        let britishTranslation = americanOnly[americanPhrase];
                        translatedWord = britishTranslation;
                        i = k;
                    }
                }
                // check if the american word is in the keys to the "american to british spelling"
                else if (americanWord in americanToBritishSpelling) {
                    console.log(`American to british spelling: ${americanWord}`)
                    let britishSpelling = americanToBritishSpelling[americanWord]
                    translatedWord = britishSpelling
                    console.log(translatedWord)
                }
                else {
                    translatedWord = americanWord;
                }

            }
            
            // always capitalize the first letter of the first word when its returned, unless it's translated
            if (words[0] == americanWord) {
                let capitalized = translatedWord.charAt(0).toUpperCase() + translatedWord.slice(1);
                translatedWords.push(capitalized)
            }
            else {
                translatedWords.push(translatedWord);
            }
        }
        console.log(translatedWords)
        return translatedWords.join(" ")
    }


    britishToAmerican(words) {

        const original = words;
        const translation = [];
        // iterate through the user-input phrase
        for (let i = 0; i < original.length; i++) {
    
            console.log(`Here is a word: ${original[i]}`)

            // checks for titles
            for (const [key, value] of Object.entries(americanToBritishTitles)) {
                const regex = new RegExp(`^${key}$`, "g")
                if (original[i].toLowerCase().match(regex)) {
                    console.log(regex)
                    console.log("Match")
                    translation.push(highlight(`${value.charAt(0).toUpperCase()}${value.slice(1)}`))
                    i++
                }
            }

            // working on this one mainly... will need to check up to three words in advance (i.e., four words long)
            // checks for british terms
            const entries = Object.entries(britishOnly);
            for (let m = 0; m < entries.length; m++) {
                // const originalKey = entries[j][0];
                // const originalKeyPlusOne = `${entries[j]} ${entries[j+1]}`;
                // const originalKeyPlusTwo = `${entries[j]} ${entries[j+1]} ${entries[j+2]}`;
                // const originalValue = entries[j][1];
                const regex = new RegExp(`^${entries[m][0]}$`, "g");
                const originalWordPlusThree = (original.slice(i, i + 4).length) == 4 ? original.slice(i, i + 4).join(" ") : false;
                const originalWordPlusTwo = (original.slice(i, i + 3).length) == 3 ? original.slice(i, i + 3).join(" ") : false;
                const originalWordPlusOne = (original.slice(i, i + 2).length) == 2 ? original.slice(i, i + 2).join(" ") : false;
                const originalWord = original[i];
                // console.log(`${originalWordPlusThree} --- ${originalWordPlusTwo} --- ${originalWordPlusOne} --- ${originalWord}`)
                if (originalWordPlusThree) {
                    if (originalWordPlusThree.match(regex)) {
                        console.log(regex)
                        console.log("Match + 3")
                        translation.push(highlight(entries[m][1]))
                        i += 4
                    }
                }
                else if (originalWordPlusTwo) {
                    if (originalWordPlusTwo.match(regex)) {
                        console.log(regex)
                        console.log("Match + 2")
                        translation.push(highlight(entries[m][1]))
                        i += 3
                    }
                }
                else if (originalWordPlusOne) {
                    if (originalWordPlusOne.match(regex)) {
                        console.log(regex)
                        console.log("Match + 1")
                        translation.push(highlight(entries[m][1]))
                        i += 2
                    }
                }
                else if (originalWord) {
                    if (originalWord.match(regex)) {
                        console.log(regex)
                        console.log("Match")
                        translation.push(highlight(entries[m][1]))
                        i++
                    }
                }
            }
            translation.push(original[i])
            console.log(translation)

            // // // check for american terms
            // // for (const [key, value] of Object.entries(americanOnly)) {
            // //     const regex = new RegExp(`\\b${value}\\b`, "g")
            // //     if (original[i].match(regex)) {
            // //         console.log(regex)
            // //         console.log("Match")
            // //         translation.push(key)
            // //         i++
            // //     }
            // // }
            // // // checks for spelling
            // // for (const [key, value] of Object.entries(americanToBritishSpelling)) {
            // //     const regex = new RegExp(`\\b${value}\\b`, "g")
            // //     if (original[i].match(regex)) {
            // //         console.log(regex)
            // //         console.log("Match")
            // //         translation.push(key)
            // //         i++
            // //     }
            // // }
        }
    }
}

module.exports = Translator;