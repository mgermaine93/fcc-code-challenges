require('dotenv').config();
const passport = require('passport');
const { ObjectID } = require('mongodb');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const GitHubStrategy = require('passport-github').Strategy;


module.exports = function (app, myDatabase) {
    // convert the contents of an object into a small "key"...
    passport.serializeUser((user, done) => {
        // the two arguments are error and the id of the user
        done(null, user._id);
    });
    
    // that can then be de-serialized into the original object
    passport.deserializeUser((id, done) => {
        myDatabase.findOne({ _id: new ObjectID(id) }, (err, doc) => {
            if (err) return console.error(err);
            done(null, doc);
        })
    });

    passport.use(new LocalStrategy((username, password, done) => {
        myDatabase.findOne({ username: username }, (err, user) => {
            console.log(`User ${username} attempted to log in.`);
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            // compares the hashes rather than the plaintext passwords
            if (!bcrypt.compareSync(password, user.password)) {
                return done(null, false);
            }
            return done(null, user);
        });
    }));

    passport.use(new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            // the below value is the CALLBACK URL that I entered into github
            callbackURL: 'http://localhost:3000/auth/github/callback'
        },
        function (accessToken, refreshToken, profile, cb) {
            console.log(profile);
            // load the user's DB object if it exists, or create one if it doesn't.
            // then, populate the fields from the profile and return the user's object
            myDatabase.findOneAndUpdate(
                { 
                    id: profile.id 
                },
                {
                    $setOnInsert: {
                        id: profile.id,
                        username: profile.username,
                        name: profile.displayName || 'John Doe',
                        photo: profile.photos[0].value || '',
                        email: Array.isArray(profile.emails)
                            ? profile.emails[0].value
                            : 'No public email',
                        created_on: new Date(),
                        provider: profile.provider || ''
                    },
                    $set: {
                        last_login: new Date()
                    },
                    $inc: {
                        login_count: 1
                    }
                },
                { 
                    upsert: true, 
                    new: true 
                },
                (err, doc) => {
                    return cb(null, doc.value);
                }
            );
        }
    ));

}