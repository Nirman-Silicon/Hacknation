const { request } = require('express');
const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const fetchUser = require("../middlewere/fetchUser");
const dotenv=require('dotenv').config();

// const JWT_SECRET = "helloiamsudhanshuprasad";

//Route:1
//Create a User using: POST "/api/auth/". Login not required
router.post('/createUser',
    body('name', 'Name too short').isLength({ min: 2 }),
    body('email', 'Email not valid').isEmail(),
    body('password', 'Password too short').isLength({ min: 5 }),
    async (req, res) => {

        //If error found, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() })
        }

        try {
            //Check if email is registered
            let user = await User.findOne({ email: req.body.email });
            let userph = await User.findOne({ phone: req.body.phone });
            if (user) {
                return res.status(400).json({ error: "Sorry the User already exists" });
            }
            if (userph) {
                return res.status(400).json({ error: "Phone number is already in use" });
            }
            const salt = await bcrypt.genSalt(10);
            const securepassword = await bcrypt.hash(req.body.password, salt);
            //Create a new user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                passwordHash: securepassword
            })

            const data = {
                user: {
                    id: user?.id
                }
            }
            const authToken = jwt.sign(data, process.env.JWT_SECRET);
            console.log(authToken);

            res.json({ authToken: authToken });

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error");
        }

    });


//Route:2
//Authenticate a User using: POST "/api/auth/". Login not required
router.post('/login', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Wrong credentials').isLength({ min: 5 }),
], async (req, res) => {

    //If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "Wrong Credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.passwordHash);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Wrong Credentials" });
        }

        const payload = {
            user: {
                id: user?.id
            }
        }
        const authToken = jwt.sign(payload, process.env.JWT_SECRET);
        console.log(user);
        res.json({ authToken: authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

});

//Route:3 
//Get loggedin user details using: POST: "/api/auth/getuser". Login is required
router.get("/getuser", fetchUser, async (req, res) => {
    try {
        let userID = req.user.id;
        const user = await User.findById(userID).select("-passwordHash");
        console.log(user)
        res.send(user);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

module.exports = router;
