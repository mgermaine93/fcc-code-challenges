'use strict';
require('dotenv').config();
const express = require('express');
const myDB = require('./connection');
const fccTesting = require('./freeCodeCamp/fcctesting.js');
const session = require('express-session');
const passport = require('passport');
const routes = require('./routes.js');
const auth = require('./auth.js');

const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http);
const passportSocketIo = require('passport.socketio');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);
const URI = process.env.MONGO_URI;
// used below in the session middleware
const store = new MongoStore({ url: URI });


app.set('view engine', 'pug');
app.set('views', './views/pug');

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false },
  key: 'express.sid',
  store: store
}));

app.use(passport.initialize());
app.use(passport.session());

fccTesting(app); //For FCC testing purposes
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// tells socket to use the memory store and set the options
io.use(
  passportSocketIo.authorize({
    cookieParser: cookieParser,
    key: 'express.sid',
    secret: process.env.SESSION_SECRET,
    store: store,
    success: onAuthorizeSuccess,
    fail: onAuthorizeFail
  })
);

myDB(async client => {

  // database connection is here
  const myDatabase = await client.db('database').collection('users');

  // imports the route and auth stuff into this main file
  routes(app, myDatabase);
  auth(app, myDatabase);

  let currentUsers = 0;

  // listen for connecting sockets (users) on the server
  // sends stuff to the client (data)
  io.on('connection', socket => {
    
    ++currentUsers;
    io.emit('user', {
      username: socket.request.user.username,
      currentUsers,
      connected: true
    });
    console.log('user ' + socket.request.user.username + ' connected');

    socket.on('chat message', (message) => {
      io.emit('chat message', {username: socket.request.user.username, message});
    });

    socket.on('disconnect', () => {
      // this will trigger whenever a disconnect event happens
      console.log('A user has disconnected');
      --currentUsers;
      io.emit('user count', currentUsers);
    });
    
  });
  
}).catch(e => {
  app.route('/').get((req, res) => {
    res.render('index', { 
      title: e, 
      message: 'Unable to connect to database' ,
      showLogin: true
    });
  });
});

function onAuthorizeSuccess(data, accept) {
  console.log('successful connection to socket.io');

  accept(null, true);
}

function onAuthorizeFail(data, message, error, accept) {
  if (error) throw new Error(message);
  console.log('failed connection to socket.io:', message);
  accept(null, false);
}

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});