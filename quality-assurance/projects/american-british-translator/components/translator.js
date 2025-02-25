const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require('./british-only.js');

const americanOnlyWords = (Object.keys(americanOnly)).map(str => str.split(" "));
const britishOnlyWords = (Object.keys(britishOnly)).map(str => str.split(" "));

const americanOnlyEntries = Object.entries(americanOnly);
const americanToBritishSpellingEntries = Object.entries(americanToBritishSpelling);
const americanToBritishTitlesEntries = Object.entries(americanToBritishTitles)
const britishOnlyEntries = Object.entries(britishOnly);

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

function convertTime(locale, time) {
    let newTime;
    console.log(`TIME from with the convertTime function: ${time}`)
    if (locale == "british-to-american" && time.includes(".")) {
        newTime = time.replace(".", ":");
    }
    else if (locale == "american-to-british" && time.includes(":")) {
        newTime = time.replace(":", ".");
    }
    else {
        newTime = time;
    }
    return newTime;
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
        // let splitInputText = text.split(/[^\w'-.]+/);
        let splitInputText = text.split(" ");
        return splitInputText
    }

    americanToBritish(words) {

        const original = words.split(" ");  // words is an array
        console.log(original)
        const translation = [];

        // iterate through the user-input words
        for (let i = 0; i < original.length; i++) {
            let word = original[i];
            let matched = false;

            // Check for multi-word phrases (4 words first)
            for (let n = 4; n > 0; n--) {
                // need to handle punctuation here
                console.log(`Here is n: ${n}`)
                let phrase = original.slice(i, i + n).join(" ");
                console.log(`Here is the phrase: ${phrase}`)
                let originalFirstCharacter = phrase.slice(0,1);
                let originalLastCharacter = phrase.slice(-1);
                let phraseToTranslate;
                let punctuationResults = getNumPunctuationMarks(phrase);
                console.log(punctuationResults)
                console.log(Object.keys(americanToBritishTitles))
                if (punctuationResults > 0 && !Object.keys(americanToBritishTitles).includes(phrase.toLowerCase())) {
                    console.log("HEEEEY")
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
                    console.log("YOOOO")
                    phraseToTranslate = (phrase) => phrase;
                }
                
                console.log(`Here is the phrase to translate: ${phraseToTranslate(phrase)}`)

                // let britishOnlyEntry = britishOnlyEntries.find(
                //     ([british, american]) => {
                //         if (american === phraseToTranslate(phrase).toLowerCase()) {
                //             console.log(100000)
                //             return american
                //         }
                //         console.log(`((( ${british} )))`)
                //         american === phraseToTranslate(phrase).toLowerCase()
                //     }
                // );
                // need to get the key rather than the value for this one
                let americanToBritishSpellingEntry = americanToBritishSpellingEntries.find(
                    ([american, british]) => american === phraseToTranslate(phrase).toLowerCase()
                );
                // console.log(americanToBritishTitlesEntries)
                // need to get the key rather than the value for this one
                let americanToBritishTitlesEntry = americanToBritishTitlesEntries.find(
                    ([american, british]) => american === phraseToTranslate(phrase).toLowerCase()
                );
                console.log(americanToBritishTitlesEntry)
                // need to get the key rather than the value for this one as well
                let americanOnlyEntry = americanOnlyEntries.find(
                    ([american, british]) => american === phraseToTranslate(phrase).toLowerCase()
                );

                // OK, so I need to get the four things above together and check if any of them are valid.
                // There's a chance that more than one may be valid.
                const entries = [
                    // britishOnlyEntry ? britishOnlyEntry[0] : undefined, 
                    americanToBritishSpellingEntry ? americanToBritishSpellingEntry[1] : undefined, 
                    americanToBritishTitlesEntry ? `${americanToBritishTitlesEntry[1].charAt(0).toUpperCase()}${americanToBritishTitlesEntry[1].slice(1)}` : undefined, 
                    // americanToBritishTitlesEntry ? americanToBritishTitlesEntry : undefined, 
                    americanOnlyEntry ? americanOnlyEntry[1] : undefined
                ]
                
                console.log(entries)
                const entry = entries.find(item => item !== undefined)
                console.log(`Here is the entry: ${entry}`)

                // there's a chance this could be multiple values...might need to fix in the future
                if (entry) {

                    // let result = entry[1];
                    let result = entry;
                    let translatedEntry;

                    console.log(originalFirstCharacter)
                    console.log(originalLastCharacter)
                    if (punctuationResults > 0 && !Object.keys(americanToBritishTitles).includes(phrase.toLowerCase())) {
                        if (punctuationResults == 3) {
                            // add back both the first and last characters
                            translatedEntry = `${originalFirstCharacter}${highlight(result)}${originalLastCharacter}`;
                            console.log(`*** ${translatedEntry} ***`)
                        }
                        else if (punctuationResults == 2) {
                            // add back the first character
                            translatedEntry = `${originalFirstCharacter}${highlight(result)}`;
                            console.log(`*** ${translatedEntry} ***`)
                        }
                        else if (punctuationResults == 1) {
                            // add back the last character
                            translatedEntry = `${highlight(result)}${originalLastCharacter}`;
                            console.log(`*** ${translatedEntry} ***`)
                        }
                    } else {
                        // re-assign the variable while keeping the old one for punctuation purposes
                        translatedEntry = highlight(result);
                        console.log(`*** ${translatedEntry} ***`)
                    }

                    translation.push(translatedEntry);
                    i += (n - 1); // Move index forward
                    matched = true;
                    break;
                } 

                console.log(translation)
            }

            // If no match, keep original word
            if (!matched) {
                // handle time
                const text = word;
                let timeToTranslate;
                console.log(`$$$$$$$$$ ${text} $$$$$$$$$$}`)
                if (text) {
                    console.log(`Potentially handling a time: ${text}`);
                    
                    const punctuationResults = getNumPunctuationMarks(text);
                    let originalFirstTimeCharacter = text.slice(0,1);
                    let originalLastTimeCharacter = text.slice(-1);

                    if (punctuationResults > 0) {
                        if (punctuationResults == 3) {
                            // remove both the first and last characters
                            timeToTranslate = (text) => (text.length > 2 ? text.slice(1, -1) : "");
                        }
                        else if (punctuationResults == 2) {
                            // remove the first character
                            timeToTranslate = (text) => (text.length > 0 ? text.slice(1) : "");
                        }
                        else if (punctuationResults == 1) {
                            // remove the last character
                            timeToTranslate = (text) => (text.length > 0 ? text.slice(0, -1) : "");
                        }
                    } else {
                        console.log("YOOOO")
                        timeToTranslate = (text) => text;
                    }

                    console.log(`Here is the time to translate: ${timeToTranslate(text)}`)

                    // could probably make better time logic, but this should do for now
                    if (timeToTranslate(text).length < 6 && timeToTranslate(text).split(":").length == 2) {
                        const convertedTime = convertTime("american-to-british", timeToTranslate(text));
                        let translatedTime;
                        const highlightedTime = highlight(convertedTime);
                        console.log(highlightedTime)

                        // adds the punctuation back
                        if (punctuationResults > 0) {
                            if (punctuationResults == 3) {
                                // add back both the first and last characters
                                translatedTime = `${originalFirstTimeCharacter}${highlightedTime}${originalLastTimeCharacter}`;
                                console.log(`*** ${translatedTime} ***`)
                            }
                            else if (punctuationResults == 2) {
                                // add back the first character
                                translatedTime = `${originalFirstTimeCharacter}${highlightedTime}`;
                                console.log(`*** ${translatedTime} ***`)
                            }
                            else if (punctuationResults == 1) {
                                // add back the last character
                                translatedTime = `${highlightedTime}${originalLastTimeCharacter}`;
                                console.log(`*** ${translatedTime} ***`)
                            }
                        } else {
                            // re-assign the variable while keeping the old one for punctuation purposes
                            translatedTime = highlightedTime;
                            console.log(`*** ${highlightedTime} ***`)
                        }


                        translation.push(translatedTime);
                        // i++ // Move index forward
                    } else {
                        // last resort, we know it's not a match nor a time.  so we can go ahead and push it.
                        translation.push(word);
                    }
                }
                // translation.push(word);
            }
        }

        return translation.join(" ");
    }


    britishToAmerican(words) {

        const original = words.split(" ");  // words is an array
        console.log(original)
        const translation = [];

        // iterate through the user-input words
        for (let i = 0; i < original.length; i++) {
            let word = original[i];
            let matched = false;

            // Check for multi-word phrases (4 words first)
            for (let n = 4; n > 0; n--) {
                // need to handle punctuation here
                console.log(`Here is n: ${n}`)
                let phrase = original.slice(i, i + n).join(" ");
                console.log(`Here is the phrase: ${phrase}`)
                let originalFirstCharacter = phrase.slice(0,1);
                let originalLastCharacter = phrase.slice(-1);
                let phraseToTranslate;
                let punctuationResults = getNumPunctuationMarks(phrase);
                console.log(punctuationResults)
                if (punctuationResults > 0) {
                    console.log("HEEEEY")
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
                    console.log("YOOOO")
                    phraseToTranslate = (phrase) => phrase;
                }
                
                console.log(`Here is the phrase to translate: ${phraseToTranslate(phrase)}`)

                let britishOnlyEntry = britishOnlyEntries.find(
                    ([british, american]) => british === phraseToTranslate(phrase).toLowerCase()
                );
                
                let americanToBritishSpellingEntry = americanToBritishSpellingEntries.find(
                    ([american, british]) => british === phraseToTranslate(phrase).toLowerCase()
                );
                // console.log(americanToBritishTitlesEntries)
                // need to get the key rather than the value for this one
                let americanToBritishTitlesEntry = americanToBritishTitlesEntries.find(
                    ([american, british]) => british === phraseToTranslate(phrase).toLowerCase()
                );
                // need to get the key rather than the value for this one as well
                // let americanOnlyEntry = americanOnlyEntries.find(
                //     ([american, british]) => american === phraseToTranslate(phrase).toLowerCase()
                // );

                // OK, so I need to get the four things above together and check if any of them are valid.
                // There's a chance that more than one may be valid.
                const entries = [
                    britishOnlyEntry ? britishOnlyEntry[1] : undefined, 
                    americanToBritishSpellingEntry ? americanToBritishSpellingEntry[0] : undefined, 
                    americanToBritishTitlesEntry ? `${americanToBritishTitlesEntry[0].charAt(0).toUpperCase()}${americanToBritishTitlesEntry[0].slice(1)}` : undefined, 
                    // americanOnlyEntry ? americanOnly[0] : undefined
                ]
                
                console.log(entries)
                const entry = entries.find(item => item !== undefined)
                console.log(`Here is the entry: ${entry}`)

                // there's a chance this could be multiple values...might need to fix in the future
                if (entry) {

                    // let result = entry[1];
                    let result = entry;
                    let translatedEntry;

                    console.log(originalFirstCharacter)
                    console.log(originalLastCharacter)
                    if (punctuationResults > 0) {
                        if (punctuationResults == 3) {
                            // add back both the first and last characters
                            translatedEntry = `${originalFirstCharacter}${highlight(result)}${originalLastCharacter}`;
                            console.log(`*** ${translatedEntry} ***`)
                        }
                        else if (punctuationResults == 2) {
                            // add back the first character
                            translatedEntry = `${originalFirstCharacter}${highlight(result)}`;
                            console.log(`*** ${translatedEntry} ***`)
                        }
                        else if (punctuationResults == 1) {
                            // add back the last character
                            translatedEntry = `${highlight(result)}${originalLastCharacter}`;
                            console.log(`*** ${translatedEntry} ***`)
                        }
                    } else {
                        // re-assign the variable while keeping the old one for punctuation purposes
                        translatedEntry = highlight(result);
                        console.log(`*** ${translatedEntry} ***`)
                    }

                    translation.push(translatedEntry);
                    i += (n - 1); // Move index forward
                    matched = true;
                    break;
                } 

                console.log(translation)
            }

            // If no match, keep original word
            if (!matched) {
                // handle time
                const text = word;
                let timeToTranslate;
                console.log(`$$$$$$$$$ ${text} $$$$$$$$$$}`)
                if (text) {
                    console.log(`Potentially handling a time: ${text}`);
                    
                    const punctuationResults = getNumPunctuationMarks(text);
                    let originalFirstTimeCharacter = text.slice(0,1);
                    let originalLastTimeCharacter = text.slice(-1);

                    if (punctuationResults > 0) {
                        if (punctuationResults == 3) {
                            // remove both the first and last characters
                            timeToTranslate = (text) => (text.length > 2 ? text.slice(1, -1) : "");
                        }
                        else if (punctuationResults == 2) {
                            // remove the first character
                            timeToTranslate = (text) => (text.length > 0 ? text.slice(1) : "");
                        }
                        else if (punctuationResults == 1) {
                            // remove the last character
                            timeToTranslate = (text) => (text.length > 0 ? text.slice(0, -1) : "");
                        }
                    } else {
                        console.log("YOOOO")
                        timeToTranslate = (text) => text;
                    }

                    console.log(`Here is the time to translate: ${timeToTranslate(text)}`)

                    // could probably make better time logic, but this should do for now
                    if (timeToTranslate(text).length < 6 && timeToTranslate(text).split(".").length == 2) {
                        const convertedTime = convertTime("british-to-american", timeToTranslate(text));
                        let translatedTime;
                        const highlightedTime = highlight(convertedTime);
                        console.log(highlightedTime)

                        // adds the punctuation back
                        if (punctuationResults > 0) {
                            if (punctuationResults == 3) {
                                // add back both the first and last characters
                                translatedTime = `${originalFirstTimeCharacter}${highlightedTime}${originalLastTimeCharacter}`;
                                console.log(`*** ${translatedTime} ***`)
                            }
                            else if (punctuationResults == 2) {
                                // add back the first character
                                translatedTime = `${originalFirstTimeCharacter}${highlightedTime}`;
                                console.log(`*** ${translatedTime} ***`)
                            }
                            else if (punctuationResults == 1) {
                                // add back the last character
                                translatedTime = `${highlightedTime}${originalLastTimeCharacter}`;
                                console.log(`*** ${translatedTime} ***`)
                            }
                        } else {
                            // re-assign the variable while keeping the old one for punctuation purposes
                            translatedTime = highlightedTime;
                            console.log(`*** ${highlightedTime} ***`)
                        }


                        translation.push(translatedTime);
                        // i++ // Move index forward
                    } else {
                        // last resort, we know it's not a match nor a time.  so we can go ahead and push it.
                        translation.push(word);
                    }
                }
                // translation.push(word);
            }
        }

        return translation.join(" ");
    }
}

module.exports = Translator;