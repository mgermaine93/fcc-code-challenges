// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// these are the inputs that will be tested:
// 2016-12-25
// 1451001600000
// 05 October 2011, GMT
// this-is-not-a-date
// undefined
// undefined
// 2016-12-25

// date endpoint 
app.get("/api/:date?", function (req, res) {
  
  // regex to see if a user-input string is all numbers
  const re = /^\d+$/

  // extract the user input 
  const userInputDate = req.params.date;

  console.log(`${userInputDate}, ${typeof(userInputDate)}`);

  // initialize variable to hold date object
  let dateObject; 
  
  // if no date is provided, respond with the current date
  if (!userInputDate) {
    dateObject = new Date(); 
    res.json({
      unix: dateObject.getTime(),
      utc: dateObject.toUTCString()
    });
  }
  else {

    // check if the date is all numbers.
    if (re.test(userInputDate)) {
      // if so, convert it to a string and create the date
      dateObject = new Date(parseInt(userInputDate));
      console.log(`${dateObject}, ${typeof dateObject}`)
      res.json({
        unix: dateObject.getTime(),
        utc: dateObject.toUTCString()
      });
    } else if ((new Date(userInputDate)).toString() == "Invalid Date") {
      res.json({ error : "Invalid Date" });
    } else {
      dateObject = new Date(userInputDate);
      console.log("In the last else block");
      console.log(`${dateObject}, ${typeof dateObject}`)
      res.json({
        unix: dateObject.getTime(),
        utc: dateObject.toUTCString()
      });
    }
  }
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
