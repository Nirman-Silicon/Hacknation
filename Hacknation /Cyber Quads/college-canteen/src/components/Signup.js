import React, { useContext, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import urlContext from '../context/api_url/urlContext';
import "./style/Signup.css"
import { actionCreaters } from '../state/index';

// const host = "http://127.0.0.1:5000";


export default function Signup() {

  const host = useContext(urlContext);
  const navigate = useNavigate();
  const [error, setError] = useState();
  const dispatch = useDispatch();

  function handleSignup() {

    if (document.getElementById("password").value === document.getElementById("confirm_password").value) {

      const url = `${host}/api/auth/createUser/`;
      let credentials = {
        "email": document.getElementById('email').value,
        "password": document.getElementById('password').value,
        "phone": document.getElementById('phone').value,
        "name": document.getElementById('name').value
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

          if (data.error && data.error[0]?.msg !== undefined) {
            // console.log(data.error[0].msg);
            setError(data.error[0]?.msg);
          } else if (data.error) {
            // console.log(data.error);
            setError(data.error);
          }

          console.log(data.authToken)
          if (data.authToken != null) {
            console.log(data);
            dispatch(actionCreaters.setLogin(true))
            navigate("/home");
            localStorage.setItem('authToken', data.authToken);
          }
        })
    } else {
      console.log("Password did not match")
      setError("Password did not match")
    }
  }

  return (
    <fieldset className='signup-details'>
      <legend>Signup</legend>
      <div className='name'>
        <label htmlFor='name'>Name:</label><br />
        <input type="text" name='name' id='name' placeholder='Enter Your Name'></input><br />
      </div>
      <div className='password'>
        <label htmlFor='password'>Enter password : </label><br />
        <input type="password" name="password" id="password" placeholder='Password'></input><br />
      </div>
      <div className='password'>
        <label htmlFor='confirm_password'>Confirm password : </label><br />
        <input type="password" name=" confirm_password" id="confirm_password" placeholder='Confirm Password'></input><br />
      </div>
      <div className='phone'>
        <label htmlFor='phone'>Phone Number : </label><br />
        <input type="text" name="phone" id="phone" placeholder='Phone Number'></input><br />
      </div>
      <div className='email'>
        <label htmlFor='email'>Email : </label><br />
        <input type="text" name="email" id="email" placeholder='E-mail'></input><br />
      </div>
      <div>
        <button id="submit" onClick={handleSignup}>Submit</button>
        <br />
      </div>
      <div className='error'>
        {error}
      </div>
    </fieldset>
  )
}

