import React from 'react'
import UrlContext from './urlContext'
// import env from "react-dotenv";

function UrlState(props) {
  
    const url=process.env.REACT_APP_BACKEND_URL||`https://good-lime-adder-shoe.cyclic.app`||`https://college-canteen-backend.herokuapp.com`;
    // console.log(process.env.REACT_APP_BACKEND_URL)
    return (
    <div>
      <UrlContext.Provider value={url}>
        {props.children}
      </UrlContext.Provider>
    </div>
  )
}

export default UrlState
