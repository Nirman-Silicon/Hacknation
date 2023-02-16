import React, { useContext, useEffect } from "react";
import PropTypes from 'prop-types'
import style from "./style/Card.module.css";
import urlContext from "../context/api_url/urlContext";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionCreaters } from "../state";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { addToCart as atc } from "../utilities";


export default function Card(props) {

  const host = useContext(urlContext)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = useSelector(state => state.login);
  const theme = useSelector(state => state.theme);
  const localCart = useSelector(state => state.cart);
  const cartPrice = useSelector(state => state.cartPrice);


  useEffect(() => {
    // dispatch(actionCreaters.setCart(cartItem))
  }, [])


  function addToCart(foodID) {
    const url = `${host}/api/cart/updateCart`
    // console.log([...localCart, { _id: foodID, quantity: 1 }]);

    //check if the food is already in the cart
    if (localCart.length === 0) {

      dispatch(actionCreaters.setCart([{ _id: foodID, quantity: 1 }]));
      console.log("local cart is empty")

      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "authToken": localStorage.getItem('authToken')
        },
        body: `{"items":${JSON.stringify([{ _id: foodID, quantity: 1 }, ...localCart])}}`
      }).then(() => {
        window.alert('food added, check cart')
      })

    }
    else {
      insertCart(foodID);
    }

  }



  //function to add an item to the cart by sending the item only
  function insertCart(foodID) {

    if (!login) {
      window.alert("You need login first")
      return
    }
    
    if(localCart.some((element)=>{
      return element._id===foodID;
    }))
    {
      window.alert("Item already in cart")
      navigate("/cart")
      return
    }

    const url = `${host}/api/cart/insertCart`;

    fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': '*/*',
        "Content-Type": "application/json",
        'authToken': localStorage.getItem('authToken')
      },
      body: `{"_id":"${foodID}", "quantity":1}`
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        dispatch(actionCreaters.setCart(data.cart.items));
        let cartSize = 0
        data.cart.items.map((element)=>{
          cartSize+=element.quantity;
          return cartSize
        })
        console.log(cartSize)
        dispatch(actionCreaters.setCartSize(cartSize));
        dispatch(actionCreaters.setCartPrice(cartPrice+props.price));
        window.alert('food added, check cart')
      })
  }

  return (
    <div className={style.item} id={"item" + props.num}>
      <Link to={`/product/${props.num}`}>
        {/* <img src={props.imgurl} alt="food" loading="lazy" /> */}
        <LazyLoadImage src={props.imgurl}
        /* width={225} height={100} */
        threshold={50}
        alt="food"
        // effect="blur"
      />
      </Link>
      <div className={style.content}>
        {/* <Link to={`/product/${props.num}`}> */}
        <div className={style.item_name}>
          <h3>{props.foodName}</h3>
          <h3>&#8377;{props.price}</h3>
        </div>
        <div>From: {props.shopName}</div>
        <div>{props.dsc}</div>
        <h5 className={!theme?style.light:null}>‎ {/* this is an invisible character */}</h5>
        {/* </Link> */}
        <button className={style.order_btn}
          onClick={() =>
            insertCart(props.num)
          }
          id={"order" + props.num}>
          Order Now
        </button>
        {/* <button className="order-btn" onClick={() => addToCart(props.num)} id={"order" + props.num}>Order Now</button> */}
      </div>
    </div>
  );
}

Card.propTypes = {
  // num:PropTypes.number.isRequired,
  foodName: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  dsc: PropTypes.string
}
Card.defaultProps = {
  foodName: "Unnamed Food",
  price: 0,
  dsc: "No discription is available for this food item"
}