const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require('./british-only.js');

const americanOnlyEntries = Object.entries(americanOnly);
const americanToBritishSpellingEntries = Object.entries(americanToBritishSpelling);
const americanToBritishTitlesEntries = Object.entries(americanToBritishTitles)
const britishOnlyEntries = Object.entries(britishOnly);

function highlight(wordOrPhrase) {
    return `<span class="highlight">${wordOrPhrase}</span>`;
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

    americanToBritish(words) {

        const original = words.split(" ");
        const translation = [];

        // iterate through the user-input words
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
                if (punctuationResults > 0 && !Object.keys(americanToBritishTitles).includes(phrase.toLowerCase())) {
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
                    phraseToTranslate = (phrase) => phrase;
                }
                
                let americanToBritishSpellingEntry = americanToBritishSpellingEntries.find(
                    ([american, british]) => american === phraseToTranslate(phrase).toLowerCase()
                );
                
                let americanToBritishTitlesEntry = americanToBritishTitlesEntries.find(
                    ([american, british]) => american === phraseToTranslate(phrase).toLowerCase()
                );
                
                let americanOnlyEntry = americanOnlyEntries.find(
                    ([american, british]) => american === phraseToTranslate(phrase).toLowerCase()
                );

                // There's a chance that more than one may be valid, I think?
                const entries = [
                    americanToBritishSpellingEntry ? americanToBritishSpellingEntry[1] : undefined, 
                    americanToBritishTitlesEntry ? `${americanToBritishTitlesEntry[1].charAt(0).toUpperCase()}${americanToBritishTitlesEntry[1].slice(1)}` : undefined, 
                    americanOnlyEntry ? americanOnlyEntry[1] : undefined
                ]
                
                const entry = entries.find(item => item !== undefined)

                // there's a chance this could be multiple values...might need to fix in the future
                if (entry) {

                    let result = entry;
                    let translatedEntry;

                    if (punctuationResults > 0 && !Object.keys(americanToBritishTitles).includes(phrase.toLowerCase())) {
                        if (punctuationResults == 3) {
                            // add back both the first and last characters
                            translatedEntry = `${originalFirstCharacter}${highlight(result)}${originalLastCharacter}`;
                        }
                        else if (punctuationResults == 2) {
                            // add back the first character
                            translatedEntry = `${originalFirstCharacter}${highlight(result)}`;
                        }
                        else if (punctuationResults == 1) {
                            // add back the last character
                            translatedEntry = `${highlight(result)}${originalLastCharacter}`;
                        }
                    } else {
                        // re-assign the variable while keeping the old one for punctuation purposes
                        translatedEntry = highlight(result);
                    }

                    translation.push(translatedEntry);
                    i += (n - 1); // Move index forward
                    matched = true;
                    break;
                } 
            }

            // If no match, keep original word.  But check to see if it's a time first.
            if (!matched) {
                // handle time
                const text = word;
                let timeToTranslate;
                if (text) {
                    
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
                        timeToTranslate = (text) => text;
                    }

                    // could probably make better time logic, but this should do for now
                    if (timeToTranslate(text).length < 6 && timeToTranslate(text).split(":").length == 2) {

                        const convertedTime = convertTime("american-to-british", timeToTranslate(text));
                        let translatedTime;
                        const highlightedTime = highlight(convertedTime);

                        // adds the punctuation back
                        if (punctuationResults > 0) {
                            if (punctuationResults == 3) {
                                // add back both the first and last characters
                                translatedTime = `${originalFirstTimeCharacter}${highlightedTime}${originalLastTimeCharacter}`;
                            }
                            else if (punctuationResults == 2) {
                                // add back the first character
                                translatedTime = `${originalFirstTimeCharacter}${highlightedTime}`;
                            }
                            else if (punctuationResults == 1) {
                                // add back the last character
                                translatedTime = `${highlightedTime}${originalLastTimeCharacter}`;
                            }
                        } else {
                            // re-assign the variable while keeping the old one for punctuation purposes
                            translatedTime = highlightedTime;
                        }

                        translation.push(translatedTime);

                    } else {
                        // last resort, we know it's not a match nor a time.  so we can go ahead and push it.
                        translation.push(word);
                    }
                }
            }
        }

        return translation.join(" ");
    }


    britishToAmerican(words) {

        const original = words.split(" ");
        const translation = [];

        // iterate through the user-input words
        for (let i = 0; i < original.length; i++) {
            let word = original[i];
            let matched = false;

            // Check for multi-word phrases (4 words first)
            for (let n = 4; n > 0; n--) {
                
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
                    phraseToTranslate = (phrase) => phrase;
                }
                
                let britishOnlyEntry = britishOnlyEntries.find(
                    ([british, american]) => british === phraseToTranslate(phrase).toLowerCase()
                );
                
                let americanToBritishSpellingEntry = americanToBritishSpellingEntries.find(
                    ([american, british]) => british === phraseToTranslate(phrase).toLowerCase()
                );
                
                let americanToBritishTitlesEntry = americanToBritishTitlesEntries.find(
                    ([american, british]) => british === phraseToTranslate(phrase).toLowerCase()
                );

                // There's a chance that more than one may be valid.
                const entries = [
                    britishOnlyEntry ? britishOnlyEntry[1] : undefined, 
                    americanToBritishSpellingEntry ? americanToBritishSpellingEntry[0] : undefined, 
                    americanToBritishTitlesEntry ? `${americanToBritishTitlesEntry[0].charAt(0).toUpperCase()}${americanToBritishTitlesEntry[0].slice(1)}` : undefined, 
                ]
                
                const entry = entries.find(item => item !== undefined)

                // there's a chance this could be multiple values...might need to fix in the future
                if (entry) {

                    let result = entry;
                    let translatedEntry;

                    if (punctuationResults > 0) {
                        if (punctuationResults == 3) {
                            // add back both the first and last characters
                            translatedEntry = `${originalFirstCharacter}${highlight(result)}${originalLastCharacter}`;
                        }
                        else if (punctuationResults == 2) {
                            // add back the first character
                            translatedEntry = `${originalFirstCharacter}${highlight(result)}`;
                        }
                        else if (punctuationResults == 1) {
                            // add back the last character
                            translatedEntry = `${highlight(result)}${originalLastCharacter}`;
                        }
                    } else {
                        // re-assign the variable while keeping the old one for punctuation purposes
                        translatedEntry = highlight(result);
                    }

                    translation.push(translatedEntry);
                    i += (n - 1); // Move index forward
                    matched = true;
                    break;
                } 

            }

            // If no match, keep original word.  But check to see if it's a time first.
            if (!matched) {
                // handle time
                const text = word;
                let timeToTranslate;
                if (text) {
                    
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
                        timeToTranslate = (text) => text;
                    }

                    // could probably make better time logic, but this should do for now
                    if (timeToTranslate(text).length < 6 && timeToTranslate(text).split(".").length == 2) {
                        const convertedTime = convertTime("british-to-american", timeToTranslate(text));
                        let translatedTime;
                        const highlightedTime = highlight(convertedTime);

                        // adds the punctuation back
                        if (punctuationResults > 0) {
                            if (punctuationResults == 3) {
                                // add back both the first and last characters
                                translatedTime = `${originalFirstTimeCharacter}${highlightedTime}${originalLastTimeCharacter}`;
                            }
                            else if (punctuationResults == 2) {
                                // add back the first character
                                translatedTime = `${originalFirstTimeCharacter}${highlightedTime}`;
                            }
                            else if (punctuationResults == 1) {
                                // add back the last character
                                translatedTime = `${highlightedTime}${originalLastTimeCharacter}`;
                            }
                        } else {
                            // re-assign the variable while keeping the old one for punctuation purposes
                            translatedTime = highlightedTime;
                        }

                        translation.push(translatedTime);

                    } else {
                        // last resort, we know it's not a match nor a time.  so we can go ahead and push it.
                        translation.push(word);
                    }
                }
            }
        }

        return translation.join(" ");
    }
}

module.exports = Translator;