import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY } from '../../../redux/slice/cartSlice';
import Card from '../../card/Card'
import styles from "./MovieItem.module.scss"
import "../../ui/button/Button.css"


const MovieItem = ({ movie, grid, id, name, price, desc, info, time, time1, imageURL}) => { // makes the card for displaying the data
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isShown, setIsShown] = useState(false);
  const shortenText = (text, n) => { // n is number of characters want to shorten to
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...")
      return shortenedText;
    }
    return text //concats ... to the length if is n characters or more  
  }
  
  const addToCart = (movie) => {
    dispatch(ADD_TO_CART(movie)) // payload is product to add to cart arrow function
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }
  
  return (
    
    <Card cardClass={grid ? `${styles.grid}` : `${styles.list}`}>
      {/* Checks to see if we want grid style or list with an if true or false */}
      {/* <Link to={`/product-details`}> */}
      {/* backticks `` add a dynamic property */}
      <div className={styles.img}>
      <img src={imageURL} alt={name}
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}/>
        {isShown && (
        <div className={styles.hoverText}>
          <h5>{name}</h5>
        </div>
        )}
      </div>
      {/* </Link> */}
      <div className={styles.content}>
        <div className={styles.details}>
          
          {/* Second dollar sign is the string in the dynamic element */}
          <h2>{shortenText(name, 30)}</h2>
          <h4>{info}</h4> 
          {/* <p  onClick={() => addToCart(movie)} style={{fontSize: "1.2rem"}}>Showtimes -&nbsp;<span>{time} </span></p> */}
          {/* <br /> */}
          <p>{desc}</p>
          <span>{`$${price}`}</span>

          {/* at the 20 mark it cuts it off */}
        </div>
        {/* <button className="btn" onClick={() => addToCart(movie)}>Add To Cart</button> */}
        {/* <button  className="--btn --btn-dark" onClick={() => addToCart(movie)}>{time}</button>  */}
        <button className="--btn --btn-default"  onClick={() => addToCart(movie)}>{time}</button> 
        <button className="--btn --btn-default"  onClick={() => addToCart(movie)}> {time1}</button> 

        {/* <button className="--btn --btn-primary" onClick={() => addToCart(movie)}>Adult -&nbsp;{`$${price}`}</button>  */}

      </div>
    </Card>
  )
}

export default MovieItem
