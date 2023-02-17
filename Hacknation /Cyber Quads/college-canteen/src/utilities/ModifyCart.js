import React, { useEffect } from 'react'
import { useContext } from "react";
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux';
import { actionCreaters } from '../state';
import urlContext from '../context/api_url/urlContext';


//make a component with +, - and custom input of number in cart funtionality

function ModifyCart(props) {

    const host = useContext(urlContext)
    const dispatch = useDispatch();
    const localcart = useSelector(state => state.cart)
    console.log(props._id + " qt= " + localcart.filter((element) => element._id === props._id)[0]?.quantity)

    useEffect(() => {
        document.getElementById(`input_${props._id}`).value = localcart.filter((element) => element._id === props._id)[0]?.quantity
    },[localcart, props._id])




    const modify = (event) => {

        const url = `${host}/api/cart/insertCart`;

        if (event.target.value === 0 || event.target.value === undefined || event.target.value === null || event.target.value === "") {
            return;
        }
        document.getElementById(`input_${props._id}`).value=event.target.value
        console.log(event.target.value)
        dispatch(actionCreaters.setCart([...localcart, { _id: props._id, quantity: event.target.value }]));
        
        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': '*/*',
                "Content-Type": "application/json",
                'authToken': localStorage.getItem('authToken')
            },
            body: `{"_id":"${props._id}", "quantity": ${event.target.value}}`
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data.cart.items);
            dispatch(actionCreaters.setCart(data.cart.items))
            console.log(`cart modified with _id: ${props._id}, and quantity: ${data.cart.items.filter((element)=>element._id===props._id)[0].quantity}`)
        })
        
    }


    return (
        <div>
            <button>-</button>
            <input type="number" id={`input_${props._id}`} onChange={modify}></input>
            <button>+</button>
        </div>
    )
}

export default ModifyCart

ModifyCart.prototype = {
    _id: PropTypes.string.isRequired
}

ModifyCart.defaultProps = {
    quantity: 1
}