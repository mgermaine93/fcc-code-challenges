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
  // extract the user input 
  const userInputDate = req.params.date; 
  console.log(userInputDate)
  // initialize variable to hold date object
  let dateObject; 
  // if the user didn't input anything, get the current date
  if (!userInputDate) {
    dateObject = new Date(); 
    res.json({
      unix: dateObject.getTime(),
      // unix: Math.floor(currentDate / 1000),
      utc: dateObject.toUTCString()
    });
  }
  // // try to convert the user data into a date
  // let attemptToFormatUserDate = new Date(userInputDate);
  // if (typeof attemptToFormatUserDate === undefined) {
  //   res.json({
  //     error: "Invalid Date"
  //   })
  // }
  // res.json({
  //     unix: dateObject.getTime(),
  //     // unix: Math.floor(currentDate / 1000),
  //     utc: dateObject.toUTCString()
  //   }); 
  
  // let userInputDate = req.params.date;
  // let dateObject = new Date(userInputDate);
  // console.log(`At the start, the user input ${userInputDate}, and the date object became ${dateObject}`)

  // if (userInputDate.length === 0) (
  //   console.log("The user entered something.")
  // )
  // // else if (userInputDate.length == 0) {
  // //   res.json({
  // //     unix: dateObject.getTime(),
  // //     // unix: Math.floor(currentDate / 1000),
  // //     utc: dateObject.toUTCString()
  // //   });
  // // }

  // // it's a valid date
  // else {

  //   console.log(`Date is valid.  Here is the userDate: ${userInputDate}`)

  //   if (userInputDate === null) {
  //     const currentDate = new Date();
      
  //   }
  //   else {
      
  //   }
  // }

});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
