import React from 'react'
import styles from "../footer/Footer.module.scss"

const date = new Date()
const year = date.getFullYear()

const Footer = () => {
  return (
    <div className={styles.footer}>
      &copy; {year} by Martin Spinelli - All Rights Reserved - Mequon Theaters 
    </div>
  )
}

export default Footer
