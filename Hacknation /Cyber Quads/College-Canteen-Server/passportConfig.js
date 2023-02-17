const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const GithubStrategy = require("passport-github2").Strategy;
// const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
const { findOneAndUpdate } = require("./models/User");
const User = require("./models/User");
const dotenv = require('dotenv').config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// GITHUB_CLIENT_ID = "your id";
// GITHUB_CLIENT_SECRET = "your id";

// FACEBOOK_APP_ID = "your id";
// FACEBOOK_APP_SECRET = "your id";

const googleCallbackURL = `${process.env.BACKEND_URL}/api/passport-auth/google/callback`

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: googleCallbackURL,
        },
        async function (req, accessToken, refreshToken, profile, done) {

            const user = {
                email: profile.emails[0].value,
                name: profile.displayName,
            }
            console.log("from strategy ",user)
            
            //save user in the database

            const dbUser = await User.findOneAndUpdate({email: profile.emails[0].value}, {googleID: profile.id}, {new: true})
            // console.log("db user ",dbUser)

            if (!dbUser) {
                const newUser = await User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    googleID: profile.id,
                })
                console.log('new user created ', newUser)
            }

            //if no errors do this 👇
            if (dbUser) {
                // console.log("after creating newuser in stratgy ", dbUser)
                done(null, profile);
            }
        }
    )
);

// passport.use(
//   new GithubStrategy(
//     {
//       clientID: GITHUB_CLIENT_ID,
//       clientSecret: GITHUB_CLIENT_SECRET,
//       callbackURL: "/auth/github/callback",
//     },
//     function (accessToken, refreshToken, profile, done) {
//       done(null, profile);
//     }
//   )
// );

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: FACEBOOK_APP_ID,
//       clientSecret: FACEBOOK_APP_SECRET,
//       callbackURL: "/auth/facebook/callback",
//     },
//     function (accessToken, refreshToken, profile, done) {
//       done(null, profile);
//     }
//   )
// );

passport.serializeUser((user, done) => {
    
    console.log("user from serializeUser ", user)
    done(null, user.id);
});

passport.deserializeUser(async (userID, done) => {
    
    const dbUser = await User.findOne({ "googleID": userID }).catch((err)=>{
        console.log("from deserializeUse ", err)
    }) 
    
    // console.log("userID from deserializeUser ", userID)
    console.log("user from deserializeUser ", dbUser)
    
    if (dbUser) {    
        done(null, dbUser);
    }
    else {
        console.log("user not found")
        // done(err, user);
    }
});
