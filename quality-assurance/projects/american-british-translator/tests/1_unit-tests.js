const chai = require('chai');
const assert = chai.assert;
const Translator = require('../components/translator.js');

let translator = new Translator();

suite('Unit Tests', () => {

    test("Translate 'Mangoes are my favorite fruit.' to British English.", () => {
        assert.strictEqual(
            translator.englishToBritish("Mangoes are my favorite fruit."),
            "Mangoes are my favourite fruit.",
            "'Mangoes are my favorite fruit.' should have translated to 'Mangoes are my favourite fruit.'"
        );
    });

    test("Translate 'I ate yogurt for breakfast.' to British English.", () => {
        assert.strictEqual(
            translator.englishToBritish("I ate yogurt for breakfast."),
            "I ate yoghurt for breakfast.",
            "'I ate yogurt for breakfast.' should have translated to 'I ate yoghurt for breakfast.'"
        );
    });

    test("Translate 'We had a party at my friend's condo.' to British English.", () => {
        assert.strictEqual(
            translator.englishToBritish("We had a party at my friend's condo."),
            "We had a party at my friend's flat.",
            "'We had a party at my friend's condo.' should have translated to 'We had a party at my friend's flat.'"
        );
    });

    test("Translate 'Can you toss this in the trashcan for me?' to British English.", () => {
        assert.strictEqual(
            translator.englishToBritish("Can you toss this in the trashcan for me?"),
            "Can you toss this in the bin for me?",
            "'Can you toss this in the trashcan for me?' should have translated to 'Can you toss this in the bin for me?'"
        );
    });

    test("Translate 'The parking lot was full.' to British English.", () => {
        assert.strictEqual(
            translator.englishToBritish("The parking lot was full."),
            "The car park was full.",
            "'The parking lot was full.' should have translated to 'The car park was full.'"
        );
    });

    test("Translate 'Like a high tech Rube Goldberg machine.' to British English.", () => {
        assert.strictEqual(
            translator.englishToBritish("Like a high tech Rube Goldberg machine."),
            "Like a high tech Heath Robinson device.",
            "'Like a high tech Rube Goldberg machine.' should have translated to 'Like a high tech Heath Robinson device.'"
        );
    });

    test("Translate 'To play hooky means to skip class or work.' to British English.", () => {
        assert.strictEqual(
            translator.englishToBritish("To play hooky means to skip class or work."),
            "To bunk off means to skip class or work.",
            "'To play hooky means to skip class or work.' should have translated to 'To bunk off means to skip class or work.'"
        );
    });

    test("Translate 'No Mr. Bond, I expect you to die.' to British English.", () => {
        assert.strictEqual(
            translator.englishToBritish("No Mr. Bond, I expect you to die."),
            "No Mr Bond, I expect you to die.",
            "'No Mr. Bond, I expect you to die.' should have translated to 'No Mr Bond, I expect you to die.'"
        );
    });

    test("Translate Dr. Grosh will see you now.' to British English.", () => {
        assert.strictEqual(
            translator.englishToBritish("Dr. Grosh will see you now."),
            "Dr Grosh will see you now.",
            "'Dr. Grosh will see you now.' should have translated to 'Dr Grosh will see you now.'"
        );
    });

    test("Lunch is at 12:15 today.' to British English.", () => {
        assert.strictEqual(
            translator.englishToBritish("Lunch is at 12:15 today."),
            "Lunch is at 12.15 today.",
            "'Lunch is at 12:15 today.' should have translated to 'Lunch is at 12.15 today.'"
        );
    });

    // Translate We watched the footie match for a while. to American English
    // Translate Paracetamol takes up to an hour to work. to American English
    // Translate First, caramelise the onions. to American English
    // Translate I spent the bank holiday at the funfair. to American English
    // Translate I had a bicky then went to the chippy. to American English
    // Translate I've just got bits and bobs in my bum bag. to American English
    // Translate The car boot sale at Boxted Airfield was called off. to American English
    // Translate Have you met Mrs Kalyani? to American English
    // Translate Prof Joyner of King's College, London. to American English
    // Translate Tea time is usually around 4 or 4.30. to American English
    // Highlight translation in Mangoes are my favorite fruit.
    // Highlight translation in I ate yogurt for breakfast.
    // Highlight translation in We watched the footie match for a while.
    // Highlight translation in Paracetamol takes up to an hour to work.

});