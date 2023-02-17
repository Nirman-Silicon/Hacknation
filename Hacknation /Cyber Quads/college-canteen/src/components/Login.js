import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
// import GoogleButton from 'react-google-button';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import urlContext from '../context/api_url/urlContext';
import { actionCreaters } from "../state/index";
import style from './style/Login.module.css'

// const host = "http://127.0.0.1:5000";

export default function Login() {

    const host = useContext(urlContext)
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function handlelogin() {
        const url = `${host}/api/auth/login`;
        let credentials = {
            "email": document.getElementById('User_ID').value,
            "password": document.getElementById('password').value
            // "email": "mymail@gmail.com",
            // "password": "fcukyou"
        }

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                    setError(data.error);
                    dispatch(actionCreaters.setLogin(false))
                }else{
                    dispatch(actionCreaters.setLogin(true))
                    localStorage.setItem('authToken', data.authToken);
                    navigate("/home");

                }
            })
            .then(() => {
                console.log(localStorage.getItem('authToken'));
            });

    }

    const googleSSOLogin = (req, res) => {

        const googleLoginUrl = `http://localhost:5000/api/passport-auth/google`
        const newWindow = window.open(googleLoginUrl, '_self', 'height=600,width=500');
    }

    useEffect(() => {
        if (localStorage.getItem('authToken')) {
            navigate('/profile');
        }
    }, [])


    return (
        // <div id='login-parent' /* className='active' */>
            <div className={style.login_container}>
                <div className={style.login}>
                    <div className={style.User_ID}>
                        {/* <div>Enter Email ID: </div> */}
                        <input className={style.email} type="email" name='User_ID' id='User_ID' placeholder='Email ID'></input><br />
                        {/* <label className={style.enter_email} htmlFor='User_ID'>Email ID:</label> */}
                    </div>
                    <div className={style.password}>
                        {/* <label htmlFor='password'>Enter password:</label><br /> */}
                        <input type="password" name="password" id='password' placeholder='Password'></input><br />
                    </div>
                    <div>
                        <button onClick={handlelogin}>Login</button>
                    </div>
                    <div>
                        <hr />
                        <button onClick={googleSSOLogin}>Sign in with google</button>
                        {/* <GoogleButton onClick={googleSSOLogin} /> */}
                    </div>
                        <span className={style.error}>{error}</span>
                    <div>
                        New User? <Link className={style.signup} to="/signup" >Sign Up</Link>
                    </div>
                </div>
            </div>
        // </div>
    );
}