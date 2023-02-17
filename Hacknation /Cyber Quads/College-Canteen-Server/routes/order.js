const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const fetchUser = require("../middlewere/fetchUser");
const { body, validationResult } = require('express-validator');
const Order = require('../models/Order');

//Route:1 
//Handle checkout from cart
router.get("/getOrder", fetchUser, async (req, res) => {
    // console.log(req.user)
    try {
        if (req.user !== undefined) {
            const order = await Order.find({ user: req.user.id });
            res.json(order);
        } else {
            console.log("req.user is undefined in cart.js")
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

//Route:2
//Handle checkout from cart
router.post("/checkout", fetchUser, async (req, res) => {
    // console.log(req.body.items)
    try {


        //find items in the cart

        const cart = await Cart.findOne({ user: req.user.id });
        // console.log("cart is ", cart)

        //if cartitem==null, return

        if (cart == null || cart?.items == null) {
            return res.status(400).send("nothing to add")
        }

        //find order items

        let order = await Order.findOne({ user: req.user.id });
        // console.log(order)
        if (order == null) {
            order = cart;
            // console.log("order is empty ")

            order = new Order({
                user: req.user.id,
                items: cart.items
            })
            const saveOrder = await order.save()

            res.send(saveOrder)
            return
        }

        //append orders with cart

            let orderItems = order?.items
            // console.log('input ', order.items);
            // console.log('input ',cart.items);
            cart.items.map((element) => {
                orderItems = addItem(element, orderItems);
            })

            //addItem function to add the element in the array
            // let item = { _id: "124", quantity: 2 }
            // let arr = [{ _id: "1234", quantity: 5 }, { _id: "124", quantity: 3 }, { _id: "134", quantity: 4 }]
            // console.log(addItem(item, arr));

            function addItem(item, arr) {
                let inArray = false;
                arr?.forEach((arrelement, index) => {
                    if (arrelement._id == item._id) {
                        inArray = true;
                        arr[index].quantity += item.quantity;
                        // console.log("element is already in array", arr);
                        // return arr;
                    }
                });
                if (!inArray) {
                    console.log("element not found, pushing new element")
                    arr.push(item);
                }
                return arr
                // console.log(element);
                // console.log('array', arr);
            }

            order.items = orderItems;

        console.log('output ', order);
        
        //if orderitems!=null returrn "cannot modify order"
        
        if (order !== null && order.items !== null && order.user !== null) {

            let neworder = await Order.findByIdAndUpdate(order._id, { $set: order }, { new: true });
            // let neworder = Order.findByIdAndUpdate({ user: req.user.id } , order);
            // console.log('neworder ',neworder)
            res.status(200).send(neworder)

        }
        else {
            //new order = cartitem
            order = new Order({
                user: req.user.id,
                items: cart.items
            })
            const saveOrder = await order.save()

            res.send(saveOrder)
        }


        //delete cartitem

        Cart.findByIdAndDelete(cart._id, (err) => {
            if (err) {
                console.log("Error: ", err)
            }
            else {
                console.log("Deleted : ", /* cart */);
            }
        })
        return;

        //     const { items } = req.body;
        //     const neworder = {};
        //     if (items) { newOrder.items = items; }
        //     let order = await Order.findOne({ user: req.user.id });
        //     console.log(order)

        //     if (req.user !== undefined) {
        //         // const cart = await cart.find({ user: req.user.id });
        //         // cart.save()
        //         let order = new Order({
        //             user: req.user.id,
        //             items: req.body.items,
        //         });

        //         const saveorder = await order.save();
        //         console.log(saveorder)


        //         let cart = await Cart.findOne({ user: req.user.id });
        //         if (cart == null) {
        //             console.log("empty");
        //             return res.status(422).send("The cart is empty");
        //         } else {
        //             cart = await Cart.findOneAndDelete({ user: req.user.id });
        //             console.log({ "success": "The cart has been deleted", cart });
        //         }


        //         return res.json(saveorder);
        //     } else {
        //         console.log("req.user is undefined in cart.js")
        //     }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});


module.exports = router;
