import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectUserName } from "../../../redux/slice/authSlice";
import styles from "./Navbar.module.scss";
import { FaUserCircle } from "react-icons/fa";

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");
// If navbar link is currently active then you want the style of styles.active
const NavbarAdmin = () => {
  const userName = useSelector(selectUserName);

  return (
    <div className={styles.navbar}>
      <div className={styles.user}>
        <FaUserCircle size={40} color="#fff" />
        <h4>{userName}</h4> 
        {/* COMES FROM THE SLICE IN REDUX  */}
      </div>
      <nav>
        <ul>
          {/* ADMIN ONLY LINKS  */}
          <li>
            <NavLink to="/admin/all-products" className={activeLink}>
              All Concession Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/add-product/" className={activeLink}>
              Add Product
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/all-movies" className={activeLink}>
              All Movies
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/add-movie/" className={activeLink}>
              Add Movie
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavbarAdmin
