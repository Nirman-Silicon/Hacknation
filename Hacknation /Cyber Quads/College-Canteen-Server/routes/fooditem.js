const express = require('express');
const fetchUser = require('../middlewere/fetchUserPassport');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Fooditem = require('../models/Fooditem');

//Route:1 
//Get cart details using: GET: "/api/fooditem/getFood". Login is not required
router.get("/getFood", async (req, res) => {
    try {
        
        let page = 1, size = 12;
        if(req.query.page){
            page=req.query.page;
        }
        if(req.query.size){
            size=req.query.size;
        }

        // console.log(page, size);
        const limit = parseInt(size)
        const skip = (page-1)*limit

        const fooditem = await Fooditem.find().limit(limit).skip(skip);
        // let newfooditem=[{"homepage": "."}];
        // newfooditem.push(fooditem)
        res.json(fooditem);
        // console.log(newfooditem);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

//Route:2
//Get cart details using: GET: "/api/fooditem/getFood/:id". Login is not required
router.get("/getFood/:id", async (req, res) => {
    try {
        const fooditem = await Fooditem.findById(req.params.id);
        res.json(fooditem);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

//Route:3
//Create a new food item using: POST: "/api/fooditem/newFood". Login is required
router.post("/newFood",
    body('name', 'Name too short').isLength({ min: 2 }),
    body('shopName', 'Shop Name too short').isLength({ min: 2 }),
    // body('price', 'price not valid').isNumber(),
    body('description', 'description too short').isLength({ min: 5 }),
    async (req, res) => {

        //If error found, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        try {
            
            //Create a new food
            
            let foodData={
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                shopName: req.body.shopName,
            }

            let food = await Fooditem.create({
                name: req.body.name,
                price: req.body.price,
                dsc: req.body.description,
                shopName: req.body.shopName,
            }).then(
                res.status(200).json(foodData)
            )
            
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error");
        }

    });
    
    module.exports = router;
