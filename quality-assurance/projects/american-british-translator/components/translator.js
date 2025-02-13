const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require('./british-only.js');

const americanOnlyWords = (Object.keys(americanOnly)).map(str => str.split(" "));
const britishOnlyWords = (Object.keys(britishOnly)).map(str => str.split(" "));

function findAllWordIndices(word, listOfLists) {
    let indices = []
    for (let h = 0; h < listOfLists.length; h++) {
        if (listOfLists[h].includes(word)) {
            indices.push(h)
        }
    }
    return indices
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
        let splitInputText = text.toLowerCase().split(/[^\w'-]+/);
        console.log(splitInputText);
        return splitInputText
    }

    americanToBritish(words) {
        // take in a list of words (via the method above)
        // sometimes need to account for multiple words at once (phrases like "blood sausage", etc.)
        let translatedWords = []
        for (let i = 0; i < words.length; i++) {
            let americanWord = words[i];
            console.log(`Here is a word: ${americanWord}`)
            let translatedWord;
            let americanIndex = findAllWordIndices(americanWord, americanOnlyWords)
            console.log(americanIndex, typeof(americanIndex))
            if (americanIndex.length > 0) {
                let k = i;
                let possibleMatch = americanOnlyWords[americanIndex[0]];
                console.log(`Possible match: ${possibleMatch}, ${typeof(possibleMatch)}`)
                let possibleMatchLength = possibleMatch.length;
                let placeholder = true
                for (let j = 0; j < possibleMatchLength; j++) {
                    console.log(`${words[k]}, ${possibleMatch[j]}`)
                    if (words[k] !== possibleMatch[j]) {
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
            // check if the american word is in the keys to "american to british titles"
            else if (americanWord in americanToBritishTitles) {
                console.log(`American to british titles: ${americanWord}`)
                let britishTitle = americanToBritishTitles[americanWord]
                let capitalizedBritishTitle = britishTitle.charAt(0).toUpperCase() + britishTitle.slice(1);
                // translatedWords.push(capitalizedBritishTitle)
                translatedWord = capitalizedBritishTitle
                console.log(translatedWord)
            }
            else {
                translatedWord = americanWord;
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
        // take in a list of words (via the method above)
        // sometimes need to account for multiple words at once (phrases like "blood sausage", etc.)
        let translatedWords = []
        for (let i = 0; i < words.length; i++) {
            let britishWord = words[i];
            console.log(`Here is a word: ${britishWord}`)
            let translatedWord;
            let britishIndex = findAllWordIndices(britishWord, britishOnlyWords)
            console.log(britishIndex, typeof(britishIndex))
            if (britishIndex.length > 0) {
                let k = i;
                let possibleMatch = britishOnlyWords[americanIndex[0]];
                console.log(`Possible match: ${possibleMatch}, ${typeof(possibleMatch)}`)
                let possibleMatchLength = possibleMatch.length;
                let placeholder = true
                for (let j = 0; j < possibleMatchLength; j++) {
                    console.log(`${words[k]}, ${possibleMatch[j]}`)
                    if (words[k] !== possibleMatch[j]) {
                        placeholder = false
                        // break
                    } else {
                        k++;
                    }
                }
                if (placeholder) {
                    console.log("Long string has been matched");
                    let britishPhrase = britishOnlyWords[americanIndex].join(" ");
                    console.log(britishPhrase);
                    let americanTranslation = britishOnly[britishPhrase];
                    translatedWord = americanTranslation;
                    i = k;
                }
            }
            // check if the american word is in the keys to the "american to british spelling"
            // else if (britishWord in british) {
            //     console.log(`American to british spelling: ${americanWord}`)
            //     let britishSpelling = americanToBritishSpelling[americanWord]
            //     translatedWord = britishSpelling
            //     console.log(translatedWord)
            // }
            // // check if the american word is in the keys to "american to british titles"
            // else if (americanWord in americanToBritishTitles) {
            //     console.log(`American to british titles: ${americanWord}`)
            //     let britishTitle = americanToBritishTitles[americanWord]
            //     let capitalizedBritishTitle = britishTitle.charAt(0).toUpperCase() + britishTitle.slice(1);
            //     // translatedWords.push(capitalizedBritishTitle)
            //     translatedWord = capitalizedBritishTitle
            //     console.log(translatedWord)
            // }
            else {
                translatedWord = americanWord;
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

    // britishToAmerican(words) {
    //     // take in a list of words (via the method above)
    //     // sometimes need to account for multiple words at once (phrases like "blood sausage", etc.)
    //     let translatedWords = []

    //     for (let i = 0; i < words.length; i++) {
    //         // console.log(`Here is i at the very start: ${i}`)
    //         let loweredBritishWord = words[i].toLowerCase();
    //         // console.log(`Here is a word: ${loweredBritishWord}`);
    //         let splitKeys = Object.keys(britishOnly).map(key => key.split(" "));

    //         let listIndex;
    //         let innerListIndex;

    //         console.log(`Here is the inner list: ${innerListIndex}`)
    //         let result = splitKeys.some((innerList, j) => {
    //             let innerIndex = innerList.indexOf(loweredBritishWord);
    //             if (innerIndex !== -1) {
    //                 console.log(`Found ${loweredBritishWord} at index [${j}][${innerIndex}] in ${innerList}`);
    //                 listIndex = j;
    //                 innerListIndex = innerIndex;
    //                 return true;
    //             }
    //             return false;
    //         })

    //         if (result) {
    //             console.log(`i = ${i}`)
    //         }
    //         if (result) {
    //             console.log(`Here is i: ${i}`)
    //             console.log(splitKeys[listIndex])
    //             let placeholder = i
    //             for (let h = 0; h < splitKeys[listIndex].length; h++) {
    //                 console.log(splitKeys[listIndex][h])
    //                 console.log(`i is this: ${i}, h is this: ${h}, i+=h is this: ${i+h}`)
    //                 console.log(`User input: ${words}, ${splitKeys[listIndex][h]}, ${words[i+h]}`)
    //                 // if (words[i+=h] !== splitKeys[listIndex][h]) {
    //                 //     console.log("No go")
    //                 // } else {
    //                 //     console.log("Go")
    //                 // }
    //             }
    //             // translatedWords.push(splitKeys.join(" "));
    //             // i += splitKeys[listIndex].length;
    //         }

    //         // console.log(`Here is the result of the some function: ${result}, ${placeholder}`)
    //     }

    //     console.log(`Here are the translated words: ${translatedWords}`)
    //     return translatedWords
    //     // for (let britishWord of words) {
    //     //     let loweredBritishWord = britishWord.toLowerCase()
    //     //     console.log(`Here is a word: ${loweredBritishWord}`)
    //     //     let splitKeys = Object.keys(britishOnly).map(key => key.split(" "))
    //     //     let match = splitKeys.some((innerList, i) => {
    //     //         let innerIndex = innerList.indexOf(loweredBritishWord);
    //     //         if (innerIndex !== -1) {
    //     //             console.log(`Found ${match} at index [${i}][${innerIndex}]`)
    //     //         }
    //     //     })
    //     //     // console.log(splitKeys)
    //     //     // // check if the american word is in the keys to "american only"
    //     //     // if (loweredBritishWord in britishOnly) {
    //     //     //     let americanTranslation = britishOnly[loweredBritishWord]
    //     //     //     translatedWords.push(americanTranslation)
    //     //     // }
    //     //     // // check if the american word is in the keys to the "american to british spelling"
    //     //     // else if (loweredBritishWord in Object.americanToBritishSpelling.values()) {
    //     //     //     let americanSpelling = Object.keys(americanToBritishSpelling).find(key => americanToBritishSpelling[key] === loweredBritishWord);
    //     //     //     translatedWords.push(americanSpelling)
    //     //     // }
    //     //     // // check if the american word is in the keys to "american to british titles"
    //     //     // else if (loweredBritishWord in Object.americanToBritishTitles.values()) {
    //     //     //     let americanTitle = Object.keys(americanToBritishTitles).find(key => americanToBritishTitles[key] === loweredBritishWord);
    //     //     //     let capitalizedAmericanTitle = americanTitle.charAt(0).toUpperCase() + americanTitle.slice(1);
    //     //     //     translatedWords.push(capitalizedAmericanTitle)
    //     //     // }
    //     //     // else {
    //     //     //     translatedWords.push(loweredBritishWord);
    //     //     // }
    //     // }
    //     // return translatedWords.join(" ")
    // }
}

module.exports = Translator;