const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
// const isUserAuthenticated = require("../middlewere/fetchUserPassport");
const fetchUser = require("../middlewere/fetchUser");
const { body, validationResult } = require('express-validator');
const Fooditem = require('../models/Fooditem');

//Route:1 
//Get cart details using: GET: "/api/cart/getCart". Login is required
router.get("/getCart", fetchUser, async (req, res) => {
    // console.log('cookies: ',req.cookies)
    try {
        if(req.user!==undefined){
            const cart = await Cart.find({ user: req.user.id });
            // const cart:Array<any> = await Cart.find({ user: req.user.id });
            // let newCart={...cart}
            // cart.cartPrice=5;

            if(cart.length==0){
                return res.json({})
            }

            let items = []
            items=cart[0]?.items
            let cartPrice=0;
            // console.log("cart is ",cart.length)
            await Promise.all(
                items?.map(async (element)=>{
                    let food = await Fooditem.findById(element._id)
                    cartPrice+=(food.price*element.quantity)
                    return cartPrice
                })
            )
            
            return res.json({...cart, cartPrice});
            
        }else{
            console.log("req.user is undefined in cart.js")
        }
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error");
        }
});


//Route:2 
//Get create a new cart using: POST: "/api/cart/newCart". Login is required
router.post("/newCart", fetchUser, async (req, res) => {
    try {
        const { items } = req.body;
        const cart = new Cart({
            user: req.user.id,
            items
        });

        const saveCart = await cart.save();
        res.json(saveCart);

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});


//Route:3a
//Update cart details using: PUT: "/api/cart/updateCart". Login is required
router.put("/updateCart", fetchUser, async (req, res) => {
    try {
        const { items } = req.body;
        const newCart = {};
        if (items) { newCart.items = items; }
        let cart = await Cart.findOne({ user: req.user.id });

        //if cart is not found, create a new cart
        if (cart == null) {
            try {
                cart = new Cart({
                    user: req.user.id,
                    items
                });

                const saveCart = await cart.save();
                return res.json(saveCart);

            }
            catch (error) {
                console.error(error.message);
                return res.status(500).send("Internal server error");
            }

        }
        //else update the cart
        else {
            cart = await Cart.findByIdAndUpdate(cart.id, { $set: newCart }, { new: true });
        }
        res.json({ "success": "The cart has been updated", cart });
        // console.log("cart updated");
        // console.log(cart.id);

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});


//Route:3a.1
//Insert a single element in the cart using: PUT: "/api/cart/insertCart". Login is required
router.put("/insertCart", fetchUser, async (req, res) => {
    try {
        const item = req.body;
        let newCart = {};
        
        if(item._id==undefined||item._id=="undefined"||item.quantity==undefined){
            res.status(400).send("Bad request");
            return;
        }

        if(item.quantity==0){
            console.log("delete"+item._id)
            // deleteItem(item._id);
        }

        let cart = await Cart.findOne({ user: req.user.id });

        //if cart is not found, create a new cart
        if (cart == null) {
            try {
                cart = new Cart({
                    user: req.user.id,
                    items: [item]
                });

                const saveCart = await cart.save();
                return res.json({ "success": "The cart has been updated", cart: saveCart });
            }
            catch (error) {
                console.error(error.message);
                return res.status(500).send("Internal server error");
            }
        }
        //else update the cart

        newCart=cart;
        let items=cart.items;

        let isPresent=false;
        let index=-1;

        newCart.items.forEach((element,i) => {
            if(element._id==item._id){
                isPresent=true;
                index=i;
            }
            // console.log(element,isPresent);
        });

        if(isPresent){
            items[index]=item;
            // console.log(items[index]._id)
            // newCart.items.push(item);
        }else{
            items.push(item); 
        }
        // console.log(items)


        //if cart is not found, create a new cart
        if (cart == null) {
            try {
                cart = new Cart({
                    user: req.user.id,
                    item
                });
                
                const saveCart = await cart.save();
                return res.json(saveCart);
                
            }
            catch (error) {
                console.error(error.message);
                return res.status(500).send("Internal server error");
            }
            
        }
        //else update the cart
        else {
            cart = await Cart.findByIdAndUpdate(cart.id, { $set: newCart }, { new: true });
        }
        res.json({ "success": "The cart has been updated", cart });
        // console.log(items);
        // console.log(cart.id);
        
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});


//Route:3b
//Update cart details using: PUT: "/api/cart/updateCart/:id". Login is required
router.put("/updateCart/:id", fetchUser, async (req, res) => {
    try {
        const { items } = req.body;
        const newCart = {};
        if (items) { newCart.items = items; }
        let cart = await Cart.findOne({ user: req.user.id });

        //if cart is not found, create a new cart
        if (cart == null) {
            try {
                cart = new Cart({
                    user: req.user.id,
                    items
                });

                const saveCart = await cart.save();
                return res.json(saveCart);

            }
            catch (error) {
                console.error(error.message);
                return res.status(500).send("Internal server error");
            }

        }
        //else check if the cart belongs to the user and update the cart
        else if (req.user.id !== cart.user.toString()) {
            res.status(401).send("Permisssion denied");
        }
        else {
            cart = await Cart.findByIdAndUpdate(cart.id, { $set: newCart }, { new: true });
            res.json({ "success": "The cart has been updated", cart });
        }
        console.log(cart.id);

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});


//Route:4a
//Delete cart details using: DELETE: "/api/cart/deleteCart". Login is required
router.delete("/deleteCart", fetchUser, async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user.id });
        if (cart == null) {
            console.log("empty");
            return res.status(422).send("The cart is empty");
        } else {
            cart = await Cart.findOneAndDelete({ user: req.user.id });
            res.json({ "success": "The cart has been deleted", cart });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});


//Route:4b
//Delete cart details using: DELETE: "/api/cart/deleteCart/:id". Login is required
router.delete("/deleteCart/:id", fetchUser, async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id);
        if (cart == null) {
            console.log("empty");
            return res.status(422).send("The cart is empty");
        } else if (req.user.id !== cart.user.toString()) {
            res.status(401).send("Permisssion denied");
        } else {
            await Cart.findByIdAndDelete(req.params.id);
            res.json({ "sucess": "The cart has been deleted", cart });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});


module.exports = router;
