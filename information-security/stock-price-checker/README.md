# Stock Price Checker

Build a full stack JavaScript app that is functionally similar to this: [https://stock-price-checker.freecodecamp.rocks/](https://stock-price-checker.freecodecamp.rocks/).

Since all reliable stock price APIs require an API key, we've built a workaround. Use [https://stock-price-checker-proxy.freecodecamp.rocks/](https://stock-price-checker-proxy.freecodecamp.rocks/) to get up-to-date stock price information without needing to sign up for your own key.

Working on this project will involve you writing your code using one of the following methods:

## Development

- Set the `NODE_ENV` environment variable to `test`, without quotes.
- Complete the project in `routes/api.js` or by creating a handler/controller.
- You will add any security features to `server.js`.
- You will create all of the functional tests in `tests/2_functional-tests.js`.

Note Privacy Considerations: Due to the requirement that only 1 like per IP should be accepted, you will have to save IP addresses. It is important to remain compliant with data privacy laws such as the General Data Protection Regulation. One option is to get permission to save the user's data, but it is much simpler to anonymize it. For this challenge, remember to anonymize IP addresses before saving them to the database. If you need ideas on how to do this, you may choose to hash the data, truncate it, or set part of the IP address to 0.

Write the following tests in `tests/2_functional-tests.js`:

- [ ] Viewing one stock: `GET` request to `/api/stock-prices/`.
- [ ] Viewing one stock and liking it: `GET` request to `/api/stock-prices/`.
- [ ] Viewing the same stock and liking it again: `GET` request to `/api/stock-prices/`.
- [ ] Viewing two stocks: `GET` request to `/api/stock-prices/`.
- [ ] Viewing two stocks and liking them: `GET` request to `/api/stock-prices/`.
