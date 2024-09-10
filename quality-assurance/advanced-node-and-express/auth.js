const { ObjectID } = require('mongodb');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const passport = require('passport');
const GitHubStrategy = require('passport-local');


module.exports = function (app, myDatabase) {
    // convert the contents of an object into a small "key"...
    passport.serializeUser((user, done) => {
        // the two arguments are error and the id of the user
        done(null, user._id);
    });
    
    // that can then be de-serialized into the original object
    passport.deserializeUser((id, done) => {
        myDatabase.findOne({ _id: new ObjectID(id) }, (err, done) => {
            done(null, doc);
        })
    });

    passport.use(new LocalStrategy((username, password, done) => {
        myDatabase.findOne({ username: username }, (err, user) => {
            console.log(`User ${username} attempted to log in.`);
            if (err) return done(err);
            if (!user) return done(null, false);
            // compares the hashes rather than the plaintext passwords
            if (!bcrypt.compareSync(password, user.password)) {
                return done(null, false);
            }
            return done(null, user);
        });
    }));

    passport.use(new GitHubStrategy({
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/'
        },
        function (accessToken, refreshToken, profile, cb) {
            console.log(profile);
            //Database logic here with callback containing our user object
        }
    ));

}