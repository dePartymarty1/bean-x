import React from 'react'

import{ useState } from "react"
import styles from "./auth.module.scss"
import { Link, useNavigate } from "react-router-dom"
import Card from '../../components/card/Card.js'
import { GiConsoleController } from 'react-icons/gi'

//Toaster Stuff
import { createUserWithEmailAndPassword, reload } from "firebase/auth";
import { toast } from 'react-toastify';
import { auth } from "../../firebase/config" //imports our auth function from our config
import Loader from '../../components/loader/Loader'


const Register = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate() //for navigation back to home screen after login success


  const registerUser = (e) => { //no authentication yet
    e.preventDefault()
    // console.log(email, password, cPassword) FOR TESTING
    if (password !== cPassword) {
      //toastify comes in
      toast.error("Passwords do not match!") //catches error for password matching
    }
    // setIsLoading(true)
    //code from toastify documentation
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        
        if (password !== cPassword) {
          return (
            toast.error()

            
          )
        }
        const user = userCredential.user;
        console.log(user)
        setIsLoading(false)

        toast.success("Registration Complete!") //logged in 
        navigate("/login") //goes to log in 
      })
      .catch((error) => {
        toast.error(error.message)
      });
  };
  
  return (
  //wrap everything for toastify notifcation container
  <>
  {isLoading && <Loader/>}
  <section className={`container ${styles.auth}`}>
  {/* REFRENCING CONTAINER IN INDEX.CSS WITH THE BACKTICKS(``) AND THE $() STRING INTERPOLATION */}
    {/* <div className={styles.img}>

    </div> */}

    <Card>
    <div className={styles.form}>
        <h2>Register</h2>

        <form onSubmit={registerUser}>
            <input 
              type="text" 
              placeholder="Email" 
              required value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />

            <input 
              type="password" 
              placeholder="Password" 
              required value={password}
              onChange={(e)=> setPassword(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="Confirm Password" 
              required value={cPassword}
              onChange={(e)=> setCPassword(e.target.value)}
            />
            <button type="submit" className="--btn --btn-primary --btn-block">Register</button>
        </form>
        {/* <button className="--btn --btn-danger --btn-block"><FaGoogle color="#fff"/>Login With Google</button> */}
        <span className={styles.register}>
            <p>Already have an account?</p>
            <Link to="/login">Login</Link>
        </span>
    </div>
    </Card>
  </section>
  </>
  )
}

export default Register
