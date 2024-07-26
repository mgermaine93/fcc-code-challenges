require('dotenv').config();
let express = require('express');
let bodyParser = require('body-parser');
let app = express();

absolutePath = __dirname + '/views/index.html';
assetsPath = __dirname + '/public';

app.use(
    "/public",
    express.static(assetsPath)
);

// mounts the bodyParser middleware
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(
    function(req, res, next) {
        let method = req.method;
        let path = req.path;
        let ip = req.ip;
        console.log(`${method} ${path} - ${ip}`);
        next();
    }
);

app.get("/", function(req, res) {
    res.sendFile(absolutePath);
});

app.get("/json", function(req, res) {
    if (process.env.MESSAGE_STYLE === "uppercase") {
        res.json({
            "message": "HELLO JSON"
        });
    } else {
        res.json({
            "message": "Hello json"
        });
    }
});

app.get("/now", function(req, res, next) {
    req.time = new Date().toString();
    next();
}, function(req, res) {
    res.json({
        "time": req.time
    });
})

// get route parameter input from the client
app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json({
    echo: word
  });
});

// get query parameter input from the client
app.get("/name", (req, res) => {
    let firstName = req.query.first;
    let lastName = req.query.last;
    res.json({
        name: `${firstName} ${lastName}`
    });
});

// get data from POST requests
app.post("/name", (req, res) => {
    let firstName = req.body.first;
    let lastName = req.body.last;
    res.json({
        name: `${firstName} ${lastName}`
    })
})



































 module.exports = app;
