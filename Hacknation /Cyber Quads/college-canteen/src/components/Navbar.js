import "./style/Navbar.css";
import React, { useContext, useEffect } from 'react';
// import { useEffect, useNavigate} from 'react-router-dom';
// import Login from './Login';
// import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actionCreaters } from "../state/index";
import urlContext from "../context/api_url/urlContext";


export default function Navbar() {

    const dispatch = useDispatch();
    const host = useContext(urlContext);
    const login = useSelector(state => state.login);
    const theme = useSelector(state => state.theme);
    const cartSize = useSelector(state => state.cartSize);


    if (theme) {
        // document.body.style = 'background: red;';
        document.body.classList.add('background-dark');
    }
    else {
        // document.body.style = 'background: green;';
        document.body.classList.remove('background-dark');
    }
    // const [login, SetLogin] = useState([Boolean(localStorage.getItem('authToken'))]);
    // let navigate=useNavigate();
    const handleLogout = () => {
        // SetLogin(false)
        dispatch(actionCreaters.setLogin(false))
        localStorage.removeItem("authToken");
        // navigate('/');
    }

    useEffect(() => {
        localStorage.getItem('authToken') && dispatch(actionCreaters.setLogin(true));

        if (!localStorage.getItem('authToken')) return

        let url = `${host}/api/cart/getCart`;

        // if(true||localStorage.getItem('authToken')!==null){
        if (localStorage.getItem('authToken') !== null) {

            // async function fetchUser() {
            // const axres = await Axios.get(url, {withCredentials:true}).catch((err) => {console.log(err)})
            // console.log(axres)
            // }
            // fetchUser();

            // // same request but with fetch
            fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': '*/*',
                    'authToken': localStorage.getItem('authToken')
                },
                // credentials: 'include'
            })
                .then(response => {
                    // console.log(response)
                    return response.json()
                })
                .then(data => {
                    if (Object.keys(data).length === 0) return

                    // console.log(Object.keys(data).length);
                    // console.log(data[0].items);
                    dispatch(actionCreaters.setCart(data[0].items));
                    dispatch(actionCreaters.setCartPrice(data.cartPrice));
                    // console.log(data.cartPrice)

                    let cartSize = 0
                    data[0].items.map((element) => {
                        cartSize += element.quantity;
                        return 0
                    })

                    dispatch(actionCreaters.setCartSize(cartSize));
                })
                .catch((error) => {
                    console.log("some error occured while fetching GET request", error)
                });
        }

    }, [])

    return (
        <>
            <div className="sticky-nav">
                <div className='navbar'>
                    <Link style={{textDecoration: 'none'}} to="/home">
                        <ul className='nav-ul' id="left">
                            <li><h2 id="fc">FC</h2></li>
                            <li><img id='fclogo' src='https://img.icons8.com/color-glass/90/000000/bread-and-rolling-pin.png' alt='fc logo' /></li>
                        </ul>
                    </Link>
                    {/* {login ? <ul className='nav-ul search-area' id="search-area">
                        <li><input placeholder='Search' type='text' name='search-text' id="search-bar" /></li>
                        <li><img src='https://img.icons8.com/ios-filled/25/000000/search--v1.png' alt='search' id="search-icon" /></li>
                    </ul> : null} */}
                    <ul className='nav-ul' id="right">
                        <li onClick={() => {
                            dispatch(actionCreaters.setThemeDark(!theme));
                        }}>
                            <div className="theme">
                                <img alt='toggle theme'
                                    src="https://img.icons8.com/fluency-systems-regular/48/000000/brightness-settings.png" />
                            </div>
                        </li>
                        {!login ? <li onClick={() => {
                            // SetLogin(true);
                            // dispatch(actionCreaters.setLogin(!login))
                        }}><Link to="/login"><p id='login'>Login</p></Link></li>
                            : null /* <li onClick={handleLogout}><p id='login'>Logout</p></li> */}
                        {login ? <>
                            <li>
                                <Link to="/profile/a">
                                    <img src="https://img.icons8.com/windows/32/000000/user-male-circle.png" alt="profile" id="profile" />
                                </Link>
                            </li>
                            <li>
                                <Link to="/cart">
                                    <img src="https://img.icons8.com/ios-glyphs/30/000000/shopping-cart--v1.png" alt="cart" id="cart" />
                                </Link>
                                <span className="cartSize">{cartSize}</span>
                            </li>
                        </> : null}
                    </ul>
                </div>
            </div>
        </>
    );
}