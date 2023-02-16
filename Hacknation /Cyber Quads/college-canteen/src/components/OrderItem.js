import React, { useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import "./style/CartItem.css";
import urlContext from "../context/api_url/urlContext";


export default function OrderItem(props) {

    const host = useContext(urlContext)


    const [item, setItem] = useState({price:0, name:"unnamed"});

    useEffect(() => {
        const url = `${host}/api/fooditem/getFood/${props.id}`;
        fetch(url)
            .then(response => {
                return response.json()
            })
            .then(data => {
                // console.log(data);
                if(data!==null)
                    setItem(data);
            });

    }, [props, host])

    return (
        <div className="cartitem" id={"item" + item?._id}>
            <div className="cartItem_image">
                <img src="https://picsum.photos/30" alt="food" />
            </div>
            <div className="cartitem_content">
                <div className="cartitem_name">
                    <h3>{item?.name}</h3>
                    <h3>&#8377;{item?.price}</h3>
                </div>
                <div className="quantity">
                    <h2>Quantity: {props.quantity}</h2>
                </div>
            </div>
        </div>
    );
}

OrderItem.propTypes = {
    quantity: PropTypes.number.isRequired,
}
OrderItem.defaultProps = {
    quantity: 0,
}