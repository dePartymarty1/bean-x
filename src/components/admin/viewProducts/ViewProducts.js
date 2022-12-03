import React, { useEffect } from 'react'
// import { toast } from 'react-toastify'
import styles from "./ViewProducts.module.scss"
// import { Link } from 'react-router-dom';
// import { FaEdit, FaTrashAlt } from 'react-icons/fa';

// Firebase
// import { db, storage } from '../../../firebase/config'
// import { collection, query, onSnapshot, orderBy, doc, deleteDoc } from "firebase/firestore";
import Loader from '../../loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { selectProducts, STORE_PRODUCTS } from '../../../redux/slice/productSlice';
// import { deleteObject, ref } from 'firebase/storage';
// Hooks
import useFetchColection from '../../../customHooks/useFetchCollection';
import {
  FILTER_BY_SEARCH,
  selectFilteredProducts,
} from "../../../redux/slice/filterSlice";

const ViewProducts = () => {
  const { data, isLoading } = useFetchColection("products") // curly braces destructures the data
  const products = useSelector(selectProducts) // pointing to product state in redux store, still mapping through
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data, //taking all data from firebase database and saving it to redux store 
      })
    )
  }, [dispatch, data]);
  

// Code made first then imported to a hook 

  // const getProducts = () => { // Since i need this function a lot in react we can make a custom hook to return the product more easily
  //   setIsLoading(true)

  //   try { // GetData from FireBase Documentation Template
  //     const productsRef = collection(db, "products"); // Products db table name so it is referencing that
  //     const q = query(productsRef, orderBy("createdAt", "desc")); // Created by shown in descending order

  //     // Listen to muliple documents in a collection documentation template
  //     onSnapshot(q, (snapshot) => { // Snapchat helps monitor the documents in Firebase

  //       const allProducts = snapshot.docs.map((doc) => ({ // place all product in this variable 
  //         id: doc.id, // grabs the id in the document 
  //         ...doc.data() // All the data in the document 
  //       }));
  //       setProducts(allProducts) // then set it to our state with allProducts slotted
  //       setIsLoading(false)
  //       dispatch(
  //         STORE_PRODUCTS({
  //           products: allProducts, //taking all products from firebase database and saving it to redux store 
  //         }))
  //     });
  //   }
  //   catch(error) {
  //     setIsLoading(false)
  //     toast.error(error.message)
  //   }
  // }

  return (
    <>
    {isLoading && <Loader />}
    <div className={styles.table}>
      <h2>All Products</h2>
      {products.length === 0 ? (
        <p>Nothing Here</p>
      ) : (
        <table>
          <thead>
          <tr>
            <th>s/n</th>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
          </tr>
          </thead>
          <tbody>
          {products.map((product, index) => {
            const {id, name, price, imageURL, category} = product;
            return (
              <tr key={id}>
                <td>
                  {index + 1}
                </td>
                <td>
                  <img src={imageURL} alt={name} style={{width: "100px", height: "100px"}} />
                </td>
                <td>
                  {name}
                </td>
                <td>{category}</td>
                <td>
                  {`$${price}`}
                </td>
              </tr>
            )
          })}
        </tbody>
        </table>
      )}
    </div>
    </>
  )
}

export default ViewProducts
