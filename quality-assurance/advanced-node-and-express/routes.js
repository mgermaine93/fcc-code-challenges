// const passport = require('passport');
// const bcrypt = require('bcrypt');

// module.exports = function (app, myDatabase) {
//     app.route('/').get((req, res) => {
//         res.render("index", {
//             title: "Connected to Database",
//             message: "Please log in",
//             showLogin: true,
//             showRegistration: true,
//             showRegistration: true
//         });
//     });

//     app.route('/login').post(passport.authenticate('local', { failureRedirect: '/' }), (req, res) => {
//         res.redirect('/profile');
//     });

//     app.route('/register').post((req, res, next) => {
//         myDatabase.findOne({ username: req.body.username }, (err, user) => {
//             if (err) {
//                 next(err);
//             } else if (user) {
//                 res.redirect('/');
//             } else {
//                 // hashes the password so that it's not stored as plaintext
//                 const hash = bcrypt.hashSync(req.body.password, 12);
//                 myDatabase.insertOne({
//                     username: req.body.username,
//                     password: hash
//                 }, (err, doc) => {
//                     if (err) {
//                         res.redirect('/');
//                     } else {
//                         // The inserted document is held within
//                         // the "ops" property of the doc
//                         next(null, doc.ops[0]);
//                     }
//                 })
//             }
//         });
//     // authenticate the new user
//     }, passport.authenticate('local', { failureRedirect: '/' }), (req, res, next) => {
//         // redirect to the "/profile" page
//         res.redirect('/profile');
//     });

//     app.route('/profile').get(ensureAuthenticated, (req, res) => {
//         res.render(
//             'profile', {
//                 username: req.user.username
//             }
//         );
//     });

//     app.route('auth/github').get(passport.authenticate('github'));
            
//     app.route('auth/github/callback')
//         .get(passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
//             res.redirect('/profile');
//     });

//     app.route('/logout').get((req, res) => {
//         req.logout();
//         res.redirect('/');
//     });

//     app.use((req, res, next) => {
//         res.status(404).type('text').send('Not found');
//     });

//     // the "isAuthenticated" function comes from the passport middleware
//     function ensureAuthenticated(req, res, next) {
//         if (req.isAuthenticated()) {
//             return next();
//         }
//         res.redirect('/');
//     }
// }

const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const { ObjectID } = require('mongodb');
const GitHubStrategy = require('passport-github').Strategy;

module.exports = function (app, myDataBase) {
  passport.serializeUser((user, done) => {
      done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
      myDataBase.findOne({ _id: new ObjectID(id) }, (err, doc) => {
          if (err) return console.error(err);
          done(null, doc);
      });
  });

  passport.use(new LocalStrategy((username, password, done) => {
    myDataBase.findOne({ username: username }, (err, user) => {
      console.log(`User ${username} attempted to log in.`);
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!bcrypt.compareSync(password, user.password)) { 
          return done(null, false);
      }
      return done(null, user);
    });
  }));

  passport.use(new GitHubStrategy({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'https://boilerplate-advancednode.sky020.repl.co/auth/github/callback'
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      //Database logic here with callback containing our user object
    }
  ));
}