const express = require('express');
const app = express();
const helmet = require('helmet');


// hides the "x-powered-by: express" default header
app.use(helmet.hidePoweredBy());

// https://forum.freecodecamp.org/t/mitigate-the-risk-of-clickjacking-with-helmet-frameguard-only-passes-one-test/477498
// prevents clickjacking since our app doesn't need to be framed
app.use(helmet.frameguard({action: 'deny'}));

// sanitizes user input
app.use(helmet.xssFilter());

// avoids inferring the response MIME type
app.use(helmet.noSniff());

// prevents some versions of internet explorer from opening untrusted HTML by default
app.use(helmet.ieNoOpen());

// Define the max age for HSTS (90 days)
const ninetyDaysInSeconds = 90*24*60*60;

// asks browsers to access the app only via HTTPS (e.g., not via HTTP)
app.use(
  helmet.hsts({
    maxAge: ninetyDaysInSeconds,
    force: true, // Override Gitpod settings
  })
);

// disable DNS prefetching
app.use(helmet.dnsPrefetchControl());

// disable client-side caching (only use when there's a real need)
app.use(helmet.noCache());

// set a content security policy to prevent the injection of anything untended into the app
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"], 
        scriptSrc: ["'self'", 'trusted-cdn.com']
    }
}));

// everything above can also be configured like this (except for noCache)
app.use(helmet({
  frameguard: {         // configure
    action: 'deny'
  },
  contentSecurityPolicy: {    // enable and configure
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ['style.com'],
    }
  },
  dnsPrefetchControl: false     // disable
}))







































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});