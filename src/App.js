import styles from './App.scss';
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import { Route, Routes } from "react-router-dom" //allows linking to another page in website

// Components
import {Navbar, Header, Footer} from "./components/index.js"

// Pages
import {Home, About, Movies, Menu, Cart, Login, Register, Reset, Admin} from "./pages";
import { ToastContainer } from 'react-toastify';
import AdminOnlyRoute from './components/adminOnlyRoute/AdminOnlyRoute';
import { FILTER_BY_CATEGORY } from './redux/slice/filterSlice';
import ProductFilter from './components/product/productFilter/ProductFilter';

// import CardHandler from './components/menu/CardHandler';

function App() {
  return (
      <main>
        <ToastContainer/>
        <Navbar />
        <header className={styles.headerBg}>
          {/* <Header /> */}
          {/* <Home /> */}
          <Routes>
            <Route path="/" element={<Header /> } />
            <Route path="/movies" element={<Movies /> } />
            <Route path="/menu" element={<Menu /> } />
            <Route path="/login" element={<Login /> } />
            <Route path="/register" element={<Register /> } />
            <Route path="/reset" element={<Reset /> } />

            <Route path="/admin/*" element={
              <AdminOnlyRoute>
              <Admin /> 
              </AdminOnlyRoute>} /> 
                {/* MAKES IT ONLY ACCESSIBLE TO ADMIN LIKE WE DID WITH NAVBAR  */}

            {/* <Route path="/about" element={<Cart /> } /> */}
            <Route path="/cart" element={<Cart />} />
          </Routes>
          </header>
        <Footer />
      </main>
  );
}

export default App;
