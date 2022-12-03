import React, {useEffect, useState} from "react" //useState is for mobile 

// Styling
import styles from "./Navbar.module.scss"
import "../ui/button/Button.css"

// Icons
import { HiOutlineMenuAlt3 } from "react-icons/hi"
import { FaShoppingCart, FaUserCircle } from "react-icons/fa"

import Button from "../ui/button/Button"
import { Link, NavLink, useNavigate } from "react-router-dom"

//Firebase and Toast
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config"

// Redux
import { useDispatch, useSelector } from "react-redux"
import { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } from "../../redux/slice/authSlice"
import ShowOnLogin, { ShowOnLogout } from "../hiddenLink/HiddenLink"
// import {AdminOnlyRoute} from "../adminOnlyRoute/AdminOnlyRoute"
import { AdminOnlyLink } from "../adminOnlyRoute/AdminOnlyRoute";
import { CALCULATE_TOTAL_QUANTITY, selectCartTotalQuantity } from "../../redux/slice/cartSlice"



const Navbar = () => { 

  const [showMenu, setShowMenu] = useState(false) //makes it so orgianlly going on device for mobile menu doesnt show
  const [displayName, setDisplayName] = useState("") 
  const [scrollPage] = useState(false) // sticky navbar
    
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch() // anytime you want to dispatch an action you use this keyword, we want to set an active user


  // MONITORS  EVERYTIME THE PAGE RELAODS IF THE USER IS SIGNED IN
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName == null) { // changes email to username
          const u1 = user.email.substring(0, user.email.indexOf("@")); // slices email
          const u2 = u1.charAt(0).toUpperCase() + u1.slice(1) // makes first letter capital  
          setDisplayName(u2)
        }
        else {
          setDisplayName(user.displayName)
        }

        dispatch(
          SET_ACTIVE_USER({ // this is from authSlice (intital state components)
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userID: user.uid
          })
        ); // pass on info from this component to your redux store

      } 
      else {
        // User is signed out
        setDisplayName("");
        dispatch(REMOVE_ACTIVE_USER())
      }
    });
  }, [dispatch, displayName])

  const toggleMenu = () => { //this function is for the toggle on the hamburger/x icon
    setShowMenu(!showMenu)
  }
  // HIDE MENU CONSTANT
  const hideMenu = () =>{
    setShowMenu(false);
  }
  // LOGO 
  const logo = (
    <div className={styles.logo}>
      <Link to="/">
        <p className={styles["logo-text"]}>
        Mequon <span>Theaters</span>
        </p>
      </Link>
    </div> 
  )
  const activeLink = ({isActive }) => (isActive ? `${styles.active}` : "")
  // ICONS 
    // const icons = (
    //   <div className={styles.menuIcons} onClick={toggleMenu}> 
    //   { //depends if on mobile device, if so display the icons 
    //     showMenu ? ( 
    //     <RiCloseLine color="#fff" size={30}/>
    //     ) : (
    //     <GiHamburgerMenu color="#fff" size={27}/> //if showMenu is equal to true and menu is displayed show icon otherwise show other icon
    //   )}
    //   </div>
    // )

  // LOGOUT CONSTANT 
  const logoutUser = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      toast.success("Successfully Logged Out")
      navigate("/")
    }).catch((error) => {
      toast.error(error.message)
    });
  };
  // CART
  const cart = (
    <li className={styles["navbar-right"]}>
      <Link to="/cart">
        Cart 
        <FaShoppingCart size={20} />
        <span>{cartTotalQuantity}</span>
      </Link> 
    </li>
    ) 
  return (
    <navbar className={scrollPage ? `${styles.fixed}` : null}>
        <nav className={styles.navbar}>
          {logo}
            <nav className={showMenu ?  `${styles["nav-links-mobile"]}` : `${styles["nav-links-mobile-hide"]}` }>
              <ul className={showMenu 
              ? `${styles["nav-links"]} ${styles["nav-links-mobile"]}` 
              : `${styles["nav-links"]}`}
              onClick={hideMenu}> 
              {/* HIDES MENU AFTER CLICK  */}  
              <li>
                <AdminOnlyLink> 
                  {/* Comes from hiddenlink.js  */}
                  <Link to="./admin/home">
                  <button className="--btn --btn-primary">Admin</button>
                  </Link>
                </AdminOnlyLink>
                </li>       
              <li>
                <NavLink exact to="/" className={activeLink}  end>Home</NavLink>
                {/* SETS THE ACTIVE STATE TO THE TAB SO THE USER KNOWS WHAT PAGE THEY ARE ON BY UNDERLINING  */}
              </li>
              <li>
                <NavLink to="/movies"  className={activeLink}>Showtimes</NavLink>
              </li>
              <li>
                {/* <a href="/menu">Concessions</a> */}
                <NavLink to="/menu"  className={activeLink}>Concessions</NavLink>
              </li> 
              {cart}
              {/* <div className={styles["right-nav"]}> */}
                <li className={styles["nav-btn"]}>
                <ShowOnLogout>
                  <Link to="/login"> <Button text={"Login"} btnClass={"btn-orange"} /> </Link>
                </ShowOnLogout>
                </li>
                {/* <li className={styles["nav-btn"]}>
                  <ShowOnLogout>
                    <Link to="/register"> <Button text={"Register"} btnClass={"btn-orange"} /> </Link>
                  </ShowOnLogout>
                </li> */}
                <ShowOnLogin>
                <a href="#home" style={{color: "#ff4500"}}>
                  <FaUserCircle size={16}/>
                  Hi, {displayName}
                </a>
                </ShowOnLogin>
                <li>
                <ShowOnLogin> 
                  {/* Comes from hiddenlink.js  */}
                  <NavLink to="/"  onClick={logoutUser}>Log Out</NavLink>
                </ShowOnLogin>
                </li>
                {/* {size.width > 600} */}
              {/* </div> */}
            </ul>
            </nav>
          <div className={styles["menu-icons"]}>
            <HiOutlineMenuAlt3 color="#fff" size={28} onClick={toggleMenu} />
             {/* depends if on mobile device, if so display the icons  */}
          </div>
        </nav>
    </navbar>

    
  )

}
export default Navbar