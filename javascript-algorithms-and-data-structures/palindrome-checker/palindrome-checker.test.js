const palindrome = require('./palindrome-checker');

test('palindrome("eye") should return a boolean.', () => {
    expect(palindrome("eye")).toBe(true || false);
});

test('palindrome("eye") should return true.', () => {
    expect(palindrome("eye")).toBe(true);
});

test('palindrome("_eye") should return true.', () => {
    expect(palindrome("_eye")).toBe(true);
});

test('palindrome("race car") should return true.', () => {
    expect(palindrome("race car")).toBe(true);
});

test('palindrome("not a palindrome") should return false.', () => {
    expect(palindrome("not a palindrome")).toBe(false);
});

test('palindrome("A man, a plan, a canal. Panama") should return true.', () => {
    expect(palindrome("A man, a plan, a canal. Panama")).toBe(true);
});

test('palindrome("never odd or even") should return true.', () => {
    expect(palindrome("never odd or even")).toBe(true);
});

test('palindrome("nope") should return false.', () => {
    expect(palindrome("nope")).toBe(false);
});

test('palindrome("almostomla") should return false.', () => {
    expect(palindrome("almostomla")).toBe(false);
});

test('palindrome("My age is 0, 0 si ega ym.") should return true.', () => {
    expect(palindrome("My age is 0, 0 si ega ym.")).toBe(true);
});

test('palindrome("1 eye for of 1 eye.") should return false.', () => {
    expect(palindrome("1 eye for of 1 eye.")).toBe(false);
});

test('palindrome("0_0 (: /-\ :) 0-0") should return true.', () => {
    expect(palindrome("0_0 (: /-\ :) 0-0")).toBe(true);
});

test('palindrome("five|\_/|four") should return false.', () => {
    expect(palindrome("five|\_/|four")).toBe(false);
})
