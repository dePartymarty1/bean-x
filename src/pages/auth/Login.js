import{ useState } from "react"
import styles from "./auth.module.scss"
import { Link, useNavigate } from "react-router-dom"
import { FaGoogle } from "react-icons/fa"
// import adv_barbarian from "../../assets/adv_barbarian.png";
import Card from '../../components/card/Card.js'

// FIREBASE & TOASTIFY
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"; //getauth is in config file
import { auth } from "../../firebase/config"
import { toast } from "react-toastify"
import Loader from "../../components/loader/Loader"
import { GoogleAuthProvider } from "firebase/auth";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()
  
  const loginUser = (e) => { //no authentication yet
    e.preventDefault() //cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur
    setIsLoading(true)

    signInWithEmailAndPassword(auth, email, password) //from firebase documentation 
    .then((userCredential) => {
      //Signed In
      // const user = userCredential.user;
      setIsLoading(false)
      toast.success("Login Successful!")
      navigate("/")
    })
    .catch((error) => {
      setIsLoading(false)
      toast.error(error.message)
    });
  };
  
  // Log In With Google
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      toast.success("Logged In Successfully")
      navigate("/")
    })
    .catch((error) => {
      toast.error(error.message)
    });
  };

  return (
    <>
    {isLoading && <Loader/>}
      <section className={`container ${styles.auth}`}>
      {/* REFRENCING CONTAINER IN INDEX.CSS WITH THE BACKTICKS(``) AND THE $() STRING INTERPOLATION */}
        {/* <div className={styles.img}>

      </div> */}
        <Card>
        <div className={styles.form}>
            <h2>Login</h2>
            <form onSubmit={loginUser}>
                <input 
                  type="text" 
                  placeholder="Email" 
                  required value={email} 
                  onChange={(e) => setEmail(e.target.value)}/>
                <input 
                  type="password"
                  placeholder="Password" 
                  required value={password}
                  onChange={(e)=> setPassword(e.target.value)}/>

                <button type="submit" className="--btn --btn-primary --btn-block">Login</button>
                <div className={styles.links}>
                    <Link to="/reset">Reset Password</Link>
                </div>
                <p>-- or --</p>
            </form>
            <button className="--btn --btn-danger --btn-block" onClick={signInWithGoogle}><FaGoogle color="#fff"/>Login With Google</button>
            <span className={styles.register}>
                <p>&nbsp; Don't have an account?</p>
                <Link to="/register">Register</Link>
            </span>
        </div>
        </Card>
      </section>
    </>
  )}

export default Login
