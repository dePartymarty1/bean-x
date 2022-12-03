import React from 'react'
import styles from "./Card.module.scss"

const Card = ({children, cardClass}) => {
  return (
    <div className={`${styles.card} ${cardClass}`}>
      {children}
    </div>
  )
}
// THIS CARD IS A REUSABLE COMPONENT THAT WILL SURROUND CONTENT 
export default Card
