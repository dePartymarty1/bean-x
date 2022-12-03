import React, { useEffect, useState } from 'react'
import {  selectProducts, STORE_PRODUCTS } from '../../redux/slice/productSlice'
import styles from "./Product.module.scss"
import ProductFilter from './productFilter/ProductFilter'
import ProductList from './productList/ProductList'
import { FaCogs } from "react-icons/fa";
//Hooks
import useFetchColection from '../../customHooks/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'



const Product = () => {
    const { data } = useFetchColection("products") // curly braces destructures the data
    const [showFilter, setShowFilter] = useState(false);
    const products = useSelector(selectProducts) // pointing to product state in redux store, still mapping through
    const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data, //taking all data from firebase database and saving it to redux store 
      })
    );
    // dispatch(
    //   GET_PRICE_RANGE({
    //     products: data,
    //   })
    // );
  }, [dispatch, data]);
  
  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  
  return (
    <section>
        {/* BACKTICKS FOR USING GLOBAL CLASS IN INDEX CSS */}
        <div className={`container ${styles.product}`}>
        <aside className={styles.filter}>
            <ProductFilter />
        </aside>  
        {/* //     showFilter ? `${styles.filter} ${styles.show}` : `${styles.filter}`
        //   }
        // >
        //   {isLoading ? null : <ProductFilter />} */}
        {/* </aside> */}
            <div className={styles.content}>
              <ProductList products={products}/> 
              {/* products is a prop to the productlist component */}
              <div className={styles.icon} onClick={toggleFilter}>
                <FaCogs size={20} color="orangered" />
                <p>
                  <b>{showFilter ? "Hide Filter" : "Show Filter"}</b>
                </p>
              </div>
              </div>
          </div>
    </section>
  )
}

export default Product
