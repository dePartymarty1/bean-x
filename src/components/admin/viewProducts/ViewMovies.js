import React, { useEffect } from 'react'
// import { toast } from 'react-toastify'
import styles from "./ViewProducts.module.scss"

import Loader from '../../loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { selectMovies, STORE_MOVIES } from '../../../redux/slice/movieSlice';

// Hooks
import useFetchColection from '../../../customHooks/useFetchCollection';




const ViewMovies = () => {
  const { data, isLoading } = useFetchColection("movies") // curly braces destructures the data
  const movies = useSelector(selectMovies) // pointing to product state in redux store, still mapping through
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
        STORE_MOVIES({
        movies: data, //taking all data from firebase database and saving it to redux store 
      })
    )
  }, [dispatch, data]);
  
  return (
    <>
    {isLoading && <Loader />}
    <div className={styles.table}>
      <h2>All Movies</h2>
      {movies.length === 0 ? (
        <p>Nothing Here</p>
      ) : (
        <table>
          <thead>
          <tr>
            <th>s/n</th>
            <th>Image</th>
            <th>Name</th>
            <th>Info</th>
            <th>Category</th>
            <th>Price</th>
            <th>Desc</th>
          </tr>
          </thead>
          <tbody>
          {movies.map((movie, index) => {
            const {id, name, price, imageURL, category, desc, info} = movie;
            return (
              <tr key={id}>
                <td>
                  {index + 1}
                </td>
                <td>
                  <img src={imageURL} alt={name} style={{width: "200px", height: "200px"}} />
                </td>
                <td>
                  {name}
                </td>
                <td>{category}</td>
                <td>
                  {`$${price}`}
                </td>
                <td>{desc}</td>
                <td>{info}</td>
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

export default ViewMovies
