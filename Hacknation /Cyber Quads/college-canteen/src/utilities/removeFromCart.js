import React from 'react'

function removeFromCart(props) {

    const remove=()=>{
        console.log(`delete with id ${props._id}`)
    }

  return (
    <div>
      <span onClick={remove}>delete</span>
    </div>
  )
}

export default removeFromCart