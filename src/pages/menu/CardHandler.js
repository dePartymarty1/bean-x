import React from 'react'
import list from './data.js'
import { useState } from 'react'
import { NavItem } from 'react-bootstrap'
import "../menu/MenuHandler.css"

const CardHandler = ({ item, handleClick }) => {
  //   const handleClick = () => {
  //     alert("Btn clicked");
  // }
  // total = 0;
  const [total, setTotal] = useState(list)

  const { title, price, imgURL } = item;
  

  return (
    <div className="cards">
      <div className="image_box">
        <img src={imgURL} alt="" />
      </div>
      <div className="details">
        <p>{title}</p>
        <p>${price}</p>
        {/* <button onClick={() => {cartButton(item.price)}}>Add to Cart</button> */}
        <button onClick={{handleClick}}>Add to Cart</button>
        {/* <button onClick={handleClick}>Add to Cart</button> */}
      </div>
    </div>
  )
}

export default CardHandler
