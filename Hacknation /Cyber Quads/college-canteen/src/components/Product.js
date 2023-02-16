import React, { useContext, useEffect, useState } from 'react'
import "./style/Product.css";
import { useParams } from 'react-router-dom';
import urlContext from "../context/api_url/urlContext";
import { useSelector } from 'react-redux';


function Product(props) {

    const host = useContext(urlContext)
    const params = useParams();
    const [product, setProduct] = useState({});
    const theme = useSelector(state => state.theme);


    const getFood = (id) => {

        const url = `${host}/api/fooditem/getfood/${id}`;
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': '*/*',
                "Content-Type": "application/json",
            }
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                if (data !== null)
                    setProduct(data);
            }).catch(error => {
                console.log(error);
            });
    }
    useEffect(() => {

        getFood(params.id);

    }, [params.id, host]);


    // console.log(params.id);

    return (
        <div className='product-container' style={{
                                                    backgroundColor: theme ? "rgb(50,50,50)" : "white",
                                                    color: theme ? "white" : "black",
                                                }}>
            <div className='product-image'>
                <img src={product.imgurl || `https://picsum.photos/500/800`} alt="food" />
            </div>
            <div className='product-info'>
                <h1>{product.name}</h1>
                <p>&#8377;{product.price}</p>
                <p>{product.dsc}</p>
            </div>
        </div>
    )
}

Product.defaultProps = {
    name: "Unnamed Food",
    price: 0,
    dsc: "No discription is available for this food item"
}

export default Product