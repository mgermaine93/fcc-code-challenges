const telephoneCheck = require('./telephone-number-validator');

test('telephoneCheck("555-555-5555") should return a boolean.', () => {
    expect(telephoneCheck("555-555-5555")).toBe(true || false);
});