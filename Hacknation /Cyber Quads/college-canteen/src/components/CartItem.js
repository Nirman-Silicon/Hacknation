import React, { useContext, useEffect, useMemo, useState } from "react";
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreaters } from "../state/index";
import "./style/CartItem.css";
import urlContext from "../context/api_url/urlContext";
import { useNavigate } from "react-router-dom";
import ModifyCart from "../utilities/ModifyCart";
import { LazyLoadImage, trackWindowScroll } from "react-lazy-load-image-component";

// const host = "http://127.0.0.1:5000";

// let cart = [{
//     _id: "props.id",
//     quantity: "quantity",
//     user_id: "localStorage.getItem('user_id')",
// },{
//     _id: "props.id+1", 
//     quantity: "quantity",
//     user_id: "localStorage.getItem('user_id')",
// },
// {
//     _id: "props.id+2",
//     quantity: "quantity",
//     user_id: "localStorage.getItem('user_id')",

// }];

export default function CartItem(props) {

    const host = useContext(urlContext)
    const navigate = useNavigate();
    const controller = new AbortController()
    let cartSize = useSelector(state => state.cartSize);
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(props.quantity);
    const cartPrice = useSelector(state => state.cartPrice);
    let cartArray = useSelector(state => state.cart);
    //cartArray needs to be updated on increment and decrement  of the quantity


    //decrease quantity
    const decqnt = () => {
        // console.log("decrease quantity")
        if (quantity > 1) {

            const url = `${host}/api/cart/insertCart`;
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "authToken": localStorage.getItem('authToken')
                },
                body: JSON.stringify({
                    _id: props.id,
                    quantity: quantity - 1,
                })
            }).catch(()=>{
                console.log("unable to decrease quantity ");
                // setQuantity(quantity + 1);
                return;
            },[])

            setQuantity(quantity - 1);
            dispatch(actionCreaters.setCartPrice(cartPrice - item?.price));
            dispatch(actionCreaters.setCartSize(cartSize - 1));
        }
    }


    //increase quantity
    const incqnt = () => {
        console.log({
            _id: props.id,
            quantity: quantity + 1,
        })

        const url = `${host}/api/cart/insertCart`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "authToken": localStorage.getItem('authToken')
            },
            body: JSON.stringify({
                "_id": props.id,
                "quantity": quantity + 1,
            })
        }).catch(()=>{
            console.log("unable to increase quantity ");
            //setQuantity(quantity - 1);
            return
        })

        setQuantity(quantity + 1);
        // dispatch(actionCreaters.setCartSize(cart))
        dispatch(actionCreaters.setCartSize(cartSize + 1));
        dispatch(actionCreaters.setCartPrice(cartPrice + item?.price));
    }

    //delete item
    const deleteItem = () => {

        let url = `${host}/api/cart/updateCart`;
        fetch(url, {
            method: "PUT",
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                "authToken": localStorage.getItem('authToken')
            },
            body: `{"items": ${JSON.stringify(cartArray.filter((element) => {
                return element._id !== props.id
            }))
                }}`
        })
            .then(response => response.json())
            .then((data) => {
                dispatch(actionCreaters.setCartSize(cartSize - quantity));
                dispatch(actionCreaters.setCartPrice(cartPrice - (item?.price*quantity)));
                dispatch(actionCreaters.setCart(cartArray.filter((element)=>{
                    if(element._id===props.id) return false
                    return true;
                })))
                // data.success !== null && setCartItem([]);
                console.log(data.success)
            })
    }

    const [item, setItem] = useState({ price: 0, name: "unnamed" });

    useMemo(() => {

        const url = `${host}/api/fooditem/getFood/${props.id}`;
        fetch(url)
            .then(response => {
                return response.json()
            })
            .then(data => {
                // console.log(data);
                if (data !== null)
                    setItem(data);
            });

    }, [props.id, host])

    useEffect(() => {

        return (() => {
            controller.abort();
        })

    }, [props, host])

    return (
        <div className="cartitem" id={"item" + item?._id} key={item?._id}>
            <div className="cartItem_image" onClick={() => { navigate(`/product/${item._id}`) }}>
                {/* <img src="https://picsum.photos/30" alt="food" loading="lazy" /> */}
                <LazyLoadImage src="https://picsum.photos/30"
                    /* width={600} height={400} */
                    scrollPosition={trackWindowScroll}
                    alt="Image Alt"
                />
            </div>
            <div className="cartitem_content">
                <div className="cartitem_name" onClick={() => { navigate(`/product/${item._id}`) }}>
                    <h3>{item?.name}</h3>
                    <h3>&#8377;{item?.price}</h3>
                </div>
                <div className="quantity">
                    <button onClick={decqnt}>-</button>
                    <h2>Quantity: {quantity}</h2>
                    <button onClick={incqnt}>+</button>
                    {/* <button onClick={()=>{dispatch(actionCreaters.decqt(1, props.id))}}>-</button>
                    <h2>Quantity: {quantity} {console.log("array is "+cartArray[0]?._id)}</h2>
                    <button onClick={()=>{dispatch(actionCreaters.setCart(cart))}}>+</button> */}
                    {/* <ModifyCart _id={props.id}></ModifyCart> */}
                    <div>
                        <img alt='delete'
                            src="https://img.icons8.com/fluency-systems-regular/48/000000/trash--v1.png"
                            onClick={deleteItem} />
                    </div>
                </div>
            </div>
        </div>
    );
}

CartItem.propTypes = {
    quantity: PropTypes.number.isRequired,
}
CartItem.defaultProps = {
    quantity: 0,
    // item: {price:0, name:"unNamed"}
}