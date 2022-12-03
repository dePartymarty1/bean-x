import React, { useEffect, useState } from 'react'
import styles from "./MovieList.module.scss"
import { BsFillGridFill } from "react-icons/bs"
import { FaListAlt } from "react-icons/fa"
import Search from "../../search/Search";
import PaginationM from "../../pagination/PaginationM";
import MovieItem from '../productItem/MovieItem';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { FILTER_BY_SEARCH, selectFilteredMovies } from '../../../redux/slice/filterMovieSlice';



const MovieList = ({ movies }) => { //taking products from product.js
  const [grid, setGrid] = useState(false); // grid state
  const [search, setSearch] = useState(""); // search state

  // Redux FilterSlice
  const filteredMovies = useSelector(selectFilteredMovies);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(12);

  // Get Current Products
  const indexOfLastMovie = currentPage * moviesPerPage; 
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice( // Slice returns a copy of a portion of an array into a new array object
    indexOfFirstMovie, // For displaying x amount of items on Page
    indexOfLastMovie
  );


  const dispatch = useDispatch(); // points to the useDispatch hook
 
  useEffect(() => { // SEARCH EFFECT
    dispatch(FILTER_BY_SEARCH({ movies, search })) //products is both name and value
  },[dispatch, movies, search]);
  // this passes info into redux, search is what is in the search field and then checks which products match search

  return (
    <div className={styles["product-list"]} id="product">
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsFillGridFill size={22} color="orangered" onClick={() => setGrid(true)} />
          <FaListAlt size={24} color="#0066d4" onClick={() => setGrid(false)} />
          <p>
            {/* <b>{filteredMovies.length}</b> Movies found. */}
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
        {movies.length === 0 ? (
          // if
          <p>No movie found.</p>
        ) : (
          // else
          <>
            {currentMovies.map((movie) => {
              return (
                <div key={movie.id}> 
                  <MovieItem {...movie} grid={grid} movie={movie} />
                  {/* pass all product properties with ...product, pass grid so it has the info on which to display */}
                </div>
              );
            })}
          </>
        )}
    </div>
    <PaginationM
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          moviesPerPage={moviesPerPage}
          totalMovies={filteredMovies.length}
        />
    </div>
  )
}


export default MovieList
