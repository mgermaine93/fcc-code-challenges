const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require('./british-only.js');

const americanOnlyWords = (Object.keys(americanOnly)).map(str => str.split(" "));
const britishOnlyWords = (Object.keys(britishOnly)).map(str => str.split(" "));

const entries = Object.entries(britishOnly);

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

function getNumPunctuationMarks(word) {
    const punctuation = /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/g;
    const firstCharacter = word[0];
    const lastCharacter = word[word.length - 1];
    if (firstCharacter.match(punctuation) && lastCharacter.match(punctuation)) {
        return 3
    } else if (firstCharacter.match(punctuation)) {
        return 2
    } else if (lastCharacter.match(punctuation)) {
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
        const original = words;  // words is an array
        const translation = [];

        for (let i = 0; i < original.length; i++) {
            let word = original[i];
            let matched = false;

            // Check for multi-word phrases (4 words first)
            for (let n = 4; n > 0; n--) {
                // need to handle punctuation here
                let phrase = original.slice(i, i + n).join(" ");
                let originalFirstCharacter = phrase.slice(0,1);
                let originalLastCharacter = phrase.slice(-1);
                let phraseToTranslate;
                let punctuationResults = getNumPunctuationMarks(phrase);
                if (punctuationResults > 0) {
                    if (punctuationResults == 3) {
                        // remove both the first and last characters
                        phraseToTranslate = (phrase) => (phrase.length > 2 ? phrase.slice(1, -1) : "");
                    }
                    else if (punctuationResults == 2) {
                        // remove the first character
                        phraseToTranslate = (phrase) => (phrase.length > 0 ? phrase.slice(1) : "");
                    }
                    else if (punctuationResults == 1) {
                        // remove the last character
                        phraseToTranslate = (phrase) => (phrase.length > 0 ? phrase.slice(0, -1) : "");
                    }
                } else {
                    phraseToTranslate = phrase;
                }
                
                console.log(phraseToTranslate)
                // need to fix this line.
                let entry = entries.find(([britishPair]) => britishPair.toLowerCase() === phraseToTranslate.toLowerCase());


                if (entry) {

                    let result = entry[1];
                    let translatedEntry;

                    if (punctuationResults > 0) {
                        if (punctuationResults == 3) {
                            // add back both the first and last characters
                            translatedEntry = `${originalFirstCharacter}${result}${originalLastCharacter}`;
                        }
                        else if (punctuationResults == 2) {
                            // add back the first character
                            translatedEntry = `${originalFirstCharacter}${result}`;
                        }
                        else if (punctuationResults == 1) {
                            // add back the last character
                            translatedEntry = `${result}${originalLastCharacter}`;
                        }
                    } else {
                        // re-assign the variable while keeping the old one for punctuation purposes
                        translatedEntry = result;
                    }

                    translation.push(highlight(translatedEntry));
                    i += (n - 1); // Move index forward
                    matched = true;
                    break;
                }
            }

            // If no match, keep original word
            if (!matched) {
                translation.push(word);
            }
        }

        return translation.join(" ");
    }
    // britishToAmerican(words) {

    //     const original = words;
    //     const translation = [];
    //     // iterate through the user-input phrase
    //     for (let i = 0; i < original.length; i++) {

    //         // console.log(`Here is a word: ${original[i]}`);
    //         let numPeriods = getNumPeriods(original[i]);
    //         // console.log(numPeriods)

    //         // checks for titles
    //         for (const [key, value] of Object.entries(americanToBritishTitles)) {
    //             const regex = new RegExp(`^${value}$`, "g")
    //             if (original[i].toLowerCase().match(regex)) {
    //                 console.log(regex)
    //                 console.log("Match")
    //                 translation.push(highlight(`${key.charAt(0).toUpperCase()}${key.slice(1)}`))
    //                 i++
    //             }
    //         }

    //         // working on this one mainly... will need to check up to three words in advance (i.e., four words long)
    //         // checks for british terms
            
    //         for (let m = 0; m < entries.length; m++) {

    //             console.log(`Here is a word: ${original[i]}`);
                
    //             let regex = new RegExp(`^${entries[m][0]}$`, "g");
    //             // console.log(entries[m][0])
    //             // console.log(regex)
    //             let originalWordPlusThree = (original.slice(i, i + 4).length) == 4 ? original.slice(i, i + 4).join(" ") : false;
    //             let originalWordPlusTwo = (original.slice(i, i + 3).length) == 3 ? original.slice(i, i + 3).join(" ") : false;
    //             let originalWordPlusOne = (original.slice(i, i + 2).length) == 2 ? original.slice(i, i + 2).join(" ") : false;
    //             // const originalWord = original[i]
    //             // console.log(`** ${entries[m][0]} ** || ${regex} || ${originalWordPlusThree} --- ${originalWordPlusTwo} --- ${originalWordPlusOne} --- ${original[i]}`)
    //             if (originalWordPlusThree) {
    //                 if (originalWordPlusThree.match(regex)) {
    //                     console.log(regex)
    //                     console.log("Match + 3")
    //                     translation.push(highlight(entries[m][1]))
    //                     i += 4
    //                 }
    //             }
    //             else if (originalWordPlusTwo) {
    //                 console.log(originalWordPlusTwo)
    //                 if (originalWordPlusTwo.match(regex)) {
    //                     console.log(regex)
    //                     console.log("Match + 2")
    //                     translation.push(highlight(entries[m][1]))
    //                     i += 3
    //                 }
    //             }
    //             else if (originalWordPlusOne) {
    //                 if (originalWordPlusOne.match(regex)) {
    //                     console.log(regex)
    //                     console.log("Match + 1")
    //                     translation.push(highlight(entries[m][1]))
    //                     i += 2
    //                 }
    //             }
    //             else if (original[i]) {
    //                 if (original[i].match(regex)) {
    //                     console.log(regex)
    //                     console.log("Match")
    //                     translation.push(highlight(entries[m][1]))
    //                     i++
    //                 }
    //             }
    //         }
    //         translation.push(original[i])
    //         // console.log(translation)

    //         // // // check for american terms
    //         // // for (const [key, value] of Object.entries(americanOnly)) {
    //         // //     const regex = new RegExp(`\\b${value}\\b`, "g")
    //         // //     if (original[i].match(regex)) {
    //         // //         console.log(regex)
    //         // //         console.log("Match")
    //         // //         translation.push(key)
    //         // //         i++
    //         // //     }
    //         // // }
    //         // // // checks for spelling
    //         // // for (const [key, value] of Object.entries(americanToBritishSpelling)) {
    //         // //     const regex = new RegExp(`\\b${value}\\b`, "g")
    //         // //     if (original[i].match(regex)) {
    //         // //         console.log(regex)
    //         // //         console.log("Match")
    //         // //         translation.push(key)
    //         // //         i++
    //         // //     }
    //         // // }
    //     }
    //     return translation.join(" ")
    // }
}

module.exports = Translator;