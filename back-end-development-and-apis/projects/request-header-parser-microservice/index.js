// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', (req, res) => {
  res.json({ greeting: 'hello API' });
});

// here's the api request header parser endpoint
app.get('/api/whoami', (req, res) => {
  fetch("https://api.ipify.org?format=json")
    .then((response) => response.json()
    .then(data => {
      // define the variables using data from ipify and the headers
      const ipAddress = data.ip;
      const language = req.headers["accept-language"];
      const software = req.headers["user-agent"];
      // send the information out
      res.json({
        "ipaddress": ipAddress,
        "language": language,
        "software": software
      });
    }
  ));
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
