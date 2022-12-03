import React, { useEffect, useState } from 'react'
import styles from "./Product.module.scss"
import { FaCogs } from "react-icons/fa";
//Hooks
import useFetchColection from '../../customHooks/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { selectMovies, STORE_MOVIES } from '../../redux/slice/movieSlice'
import MovieList from './productList/MovieList';
import MovieFilter from './productFilter/MovieFilter';



const Movie = () => {
    const { data } = useFetchColection("movies") // curly braces destructures the data
    const [showFilter, setShowFilter] = useState(false);
    const movies = useSelector(selectMovies) // pointing to product state in redux store, still mapping through
    const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      STORE_MOVIES({
        movies: data, //taking all data from firebase database and saving it to redux store 
      })
    );
  }, [dispatch, data]);
  
  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  
  return (
    <section>
        {/* BACKTICKS FOR USING GLOBAL CLASS IN INDEX CSS */}
        <div className={`container ${styles.product}`}>
        <aside className={styles.filter}>
            <MovieFilter />
        </aside>  
            <div className={styles.content}>
              <MovieList movies={movies}/> 
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

export default Movie
