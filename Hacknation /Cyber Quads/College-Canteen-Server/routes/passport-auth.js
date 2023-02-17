const express = require('express');
const router = express.Router();
const passport = require("passport");
const isUserAuthenticated = require('../middlewere/fetchUserPassport');

const CLIENT_URL = "http://localhost:3000";

router.get("/login/success", (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: "successful",
            user: req.user,
            //   cookies: req.cookies
        });
    }
});

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "failure",
    });
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(CLIENT_URL);
});

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureMessage: "some error occurred",
        successRedirect: `${CLIENT_URL}/home`,
        failureRedirect: `${CLIENT_URL}/login/failed`,
    }),
    (req, res)=>{
        console.log("success ", req.user);
        res.send("sucessfully loggedin")
    }
);

router.get('/isAuthenticated', isUserAuthenticated, (req, res)=>{
    console.log(req.cookies)
    return res.send("yes authenticated");
});

module.exports = router
