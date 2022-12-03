import React from 'react'
import { Route, Routes } from 'react-router-dom'
import styles from "../admin/Admin.module.scss"
import NavbarAdmin from '../../components/admin/navbar/NavbarAdmin'
// import Orders from "../../components/admin/orders/Orders";
import ViewProducts from "../../components/admin/viewProducts/ViewProducts";
import AddProducts from "../../components/admin/addProducts/AddProducts";
import AddMovie from "../../components/admin/addProducts/AddMovie";
import ViewMovies from "../../components/admin/viewProducts/ViewMovies";


const Admin = () => {
    return (
      <div className={styles.admin}>
        <div className={styles.navbar}>
          <NavbarAdmin />
        </div>
        <div className={styles.content}>
          <Routes>
            {/* <Route path="home" element={<Home />} /> */}
            <Route path="all-products" element={<ViewProducts />} />
            <Route path="add-product" element={<AddProducts />} />
            <Route path="all-movies" element={<ViewMovies />} />
            <Route path="add-movie" element={<AddMovie />} />
          </Routes>
        </div>
      </div>
    );
  };

export default Admin
