import React, { useState } from 'react'

import styles from "./auth.module.scss"
import { Link } from "react-router-dom"
// import adv_barbarian from "../../assets/adv_barbarian.png";
import Card from '../../components/card/Card.js'

//Firebase
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from 'react-toastify';
import { auth } from "../../firebase/config"
import Loader from '../../components/loader/Loader';

const Reset = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const resetPassword = (e) => {
    e.preventDefault(); //stops form from reloading
    setIsLoading(true)

    sendPasswordResetEmail(auth, email)
    .then(() => {
      setIsLoading(false)
      toast.success("Check email for reset link")
    })
    .catch((error) => {
      setIsLoading(false)
      toast.error(error.message)
      
    });
  }
  return (
    <>
    {isLoading && <Loader/>}
      <section className={`container ${styles.auth}`}>
      {/* REFRENCING CONTAINER IN INDEX.CSS WITH THE BACKTICKS(``) AND THE $() STRING INTERPOLATION */}
        {/* <div className={styles.img}>
    
        </div> */}
        <Card>
        <div className={styles.form}>
            <h2>Reset Password</h2>
            <form onSubmit={resetPassword}>
                <input 
                  type="text" 
                  placeholder="Email" 
                  required value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="--btn --btn-primary --btn-block">Reset Password</button>
                <div className={styles.links}>
                  <p>
                      <Link to="/login">Login</Link>
                  </p>
                  <p>
                      <Link to="/register">Register</Link>
                  </p>
                </div>
            </form>
            {/* <span className={styles.register}>
                <p>Already have an account?</p>
                <Link to="/login">Login</Link>
            </span> */}
        </div>
        </Card>
      </section>
    </>
  )
}




export default Reset
