import React from 'react'
import styles from "./Header.module.scss"
import "../slider/Slider.css"
import Button from '../ui/button/Button'
import "../ui/button/Button.css"
import "../slider/Slider_bg.css"
import { Slider_bg } from '../slider/Slider_bg'
import ImageSlider_bg from '../slider/ImageSlider_bg'
import people1 from "../../assets/people1.png";

import { Link } from "react-router-dom"

// {/*Making left and right side of the screen*/}
const Header = () => {
  return (
    <header>
      <div className={styles.header}>
      <section id="header">
      <div className={styles.header}>
        <div className={styles.banner}>
        <ImageSlider_bg slides_bg={Slider_bg} />
        {/* <ImageSlider slides={Slider} />; */}
        </div> 
        <div className="header-overlay">
          <div className={styles.top}>
            <h1>
              <span>ALL THE NECESSARY MOVIES </span>
              <span> IN ONE PLACE RELAX & ENJOY</span>
            </h1>
            <p>Mequon Theaters is always innovating and changing the way our guests see movies.</p>
          {/* BUTTONS */}
          {/*//call to action design */}
          <div className={styles.cta}>
            <Button text={"Get Tickets"} btnClass={"btn-orange"} href={"/movies"}/>
            <Button text={"Learn More"} btnClass={"btn-dark"} href={"/about"}/>
          </div>
          
         {/* ENDS HEADER-TOP */}
        
          <div className={styles.above}>
            <h1>Order Food & Beverage in Advance!</h1>
            <p>Make it easy with convenient, stress-free and low-contact online ordering. We strongly recommend purchasing food and beverages in advance <span><Link to="/menu" style={{color: "orangered"}}>HERE</Link></span></p> 
            <br />
            <br />
          </div>
          </div>
          <div className={styles.below}>
            <img src={people1} alt="people" />
          </div>
          </div>
        <div className={styles.footer}>
          <span>Close</span>

        </div>
      </div>
    </section>
    </div>
    </header>
  )
}

export default Header
