import React, { useEffect, useState } from 'react'
import styles from "./ProductList.module.scss"
import { BsFillGridFill } from "react-icons/bs"
import { FaListAlt } from "react-icons/fa"
import Search from "../../search/Search";
import ProductItem from '../productItem/ProductItem';
import Pagination from "../../pagination/Pagination";

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { FILTER_BY_SEARCH, selectFilteredProducts } from '../../../redux/slice/filterSlice';

const ProductList = ({ products }) => { //taking products from product.js
  const [grid, setGrid] = useState(true); // grid state
  const [search, setSearch] = useState(""); // search state

  // Redux FilterSlice
  const filteredProducts = useSelector(selectFilteredProducts);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  // Get Current Products
  const indexOfLastProduct = currentPage * productsPerPage; 
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice( // Slice returns a copy of a portion of an array into a new array object
    indexOfFirstProduct, // For displaying x amount of items on Page
    indexOfLastProduct
  );


  const dispatch = useDispatch(); // points to the useDispatch hook
 
  useEffect(() => { // SEARCH EFFECT
    dispatch(FILTER_BY_SEARCH({ products, search })) //products is both name and value
  },[dispatch, products, search]);
  // this passes info into redux, search is what is in the search field and then checks which products match search

  return (
    <div className={styles["product-list"]} id="product">
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsFillGridFill size={22} color="orangered" onClick={() => setGrid(true)} />
          <FaListAlt size={24} color="#0066d4" onClick={() => setGrid(false)} />
          <p>
            <b>{filteredProducts.length}</b> Products found.
          </p>
        </div>
      {/* Search Icon */}
      <div>
        <Search value={search} onChange={(e) => setSearch(e.target.value)} /> 
        {/* () => arrow function syntax as a callback with an event parameter that has setSearch to point to even target value */}
      </div>
    </div>
      <div className={grid ? `${styles.grid}` : `${styles.list}`}>
        {/* if grid is equal to true then it will have the grid style otherwise lise view  */}
        {products.length === 0 ? (
          // if
          <p>No product found.</p>
        ) : (
          // else
          <>
            {currentProducts.map((product) => {
              return (
                <div key={product.id}> 
                  <ProductItem {...product} grid={grid} product={product} />
                  {/* pass all product properties with ...product, pass grid so it has the info on which to display */}
                </div>
              );
            })}
          </>
        )}
    </div>
    <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          productsPerPage={productsPerPage}
          totalProducts={filteredProducts.length}
        />
    </div>
  )
}


export default ProductList
