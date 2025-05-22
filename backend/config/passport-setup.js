// config/passport-setup.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userModel.js'); 

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

passport.use(
    new GoogleStrategy({
        // Options for google strategy
        clientID: process.env.GOOGLE_CLIENT_ID, 
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback' // This needs to be relative to base URL, or full URL
    }, async (accessToken, refreshToken, profile, done) => {
        // Passport callback function
        try {
            // Check if user already exists in our db
            let currentUser = await User.findOne({ googleId: profile.id });

            if (currentUser) {
                // already have this user
                console.log('User is:', currentUser);
                done(null, currentUser);
            } else {
                // if not, create new user in our db
                currentUser = await new User({
                    googleId: profile.id,
                    username: profile.displayName,
                    email: profile.emails[0].value ,
                    fullName: profile.displayName 
                }).save();
                console.log('New user created:', currentUser);
                done(null, currentUser);
            }
        } catch (err) {
            console.error('Error in Google Strategy:', err);
            done(err, null);
        }
    })
);