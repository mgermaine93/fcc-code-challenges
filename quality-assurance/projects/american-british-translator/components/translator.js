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
                    ([britishOnlyPair]) => britishOnlyPair === phraseToTranslate(phrase).toLowerCase()
                );
                // need to get the key rather than the value for this one
                let americanToBritishSpellingEntry = americanToBritishSpellingEntries.find(
                    ([_, britishSpelling]) => britishSpelling === phraseToTranslate(phrase).toLowerCase()
                );
                // console.log(americanToBritishTitlesEntries)
                // need to get the key rather than the value for this one
                let americanToBritishTitlesEntry = americanToBritishTitlesEntries.find(
                    ([_, britishTitle]) => britishTitle === phraseToTranslate(phrase).toLowerCase()
                );
                // need to get the key rather than the value for this one as well
                let americanOnlyEntry = americanOnlyEntries.find(
                    ([_, americanWord]) => americanWord === phraseToTranslate(phrase).toLowerCase()
                );

                // OK, so I need to get the four things above together and check if any of them are valid.
                // There's a chance that more than one may be valid.
                const entries = [
                    britishOnlyEntry ? britishOnlyEntry[1] : undefined, 
                    americanToBritishSpellingEntry ? americanToBritishSpellingEntry[0] : undefined, 
                    americanToBritishTitlesEntry ? americanToBritishTitlesEntry[0] : undefined, 
                    americanOnlyEntry ? americanOnly[0] : undefined
                ]
                // const entries = [
                //     britishOnlyEntry, 
                //     americanToBritishSpellingEntry, 
                //     americanToBritishTitlesEntry, 
                //     americanOnlyEntry
                // ]
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
                            translatedEntry = `${originalFirstCharacter}${result}${originalLastCharacter}`;
                            console.log(`*** ${translatedEntry} ***`)
                        }
                        else if (punctuationResults == 2) {
                            // add back the first character
                            translatedEntry = `${originalFirstCharacter}${result}`;
                            console.log(`*** ${translatedEntry} ***`)
                        }
                        else if (punctuationResults == 1) {
                            // add back the last character
                            translatedEntry = `${result}${originalLastCharacter}`;
                            console.log(`*** ${translatedEntry} ***`)
                        }
                    } else {
                        // re-assign the variable while keeping the old one for punctuation purposes
                        translatedEntry = result;
                        console.log(`*** ${translatedEntry} ***`)
                    }

                    translation.push(highlight(translatedEntry));
                    i += (n - 1); // Move index forward
                    matched = true;
                    break;
                } else {
                    // handle time
                    const text = phraseToTranslate(phrase)
                    if (text) {
                        console.log(`Potentially handling a time: ${text}`)
                        const timeRegex = new RegExp(`^([^.:]*.:[^.:]*)$`)
                        if (text.length < 6 && timeRegex) {
                            return convertTime("british-to-american", text)
                        }
                    } else {
                        continue
                    }
                    // add the untranslated word
                    // translation.push(word)
                    // i += (n - 1); // Move index forward
                    // n--
                }

                console.log(translation)
            }

            // If no match, keep original word
            if (!matched) {
                translation.push(word);
            }
        }

        return translation.join(" ");
    }
}

module.exports = Translator;