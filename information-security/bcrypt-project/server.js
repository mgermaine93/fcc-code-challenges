'use strict';
const bcrypt = require('bcrypt');
const express = require('express');
const bodyParser = require('body-parser');
const fccTesting = require('./freeCodeCamp/fcctesting.js');
const app = express();
fccTesting(app);

// to get the FCC tests to work in the browser, these need to be hardcoded instead of ENV references
const saltRounds = process.env.SALT_ROUNDS;
const myPlaintextPassword = process.env.MY_PLAIN_TEXT_PASSWORD;
const someOtherPlainTextPassword = process.env.SOME_OTHER_PLAIN_TEXT_PASSWORD;

//START_ASYNC -do not remove notes, place code between correct pair of notes.
bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
  /*Store hash in your db*/
  console.log(hash)
  bcrypt.compare(myPlaintextPassword, hash, (err, res) => {
    console.log(res); //true
  });
});
//END_ASYNC

//START_SYNC
var hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
console.log(hash);
var result = bcrypt.compareSync(myPlaintextPassword, hash);
console.log(result);
//END_SYNC





























const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Listening on port:", PORT)
});