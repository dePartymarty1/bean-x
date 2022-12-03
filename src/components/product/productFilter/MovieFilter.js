import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {FILTER_BY_CATEGORY} from "../../../redux/slice/filterMovieSlice";
import { selectMovies } from "../../../redux/slice/movieSlice";
import styles from "./ProductFilter.module.scss";

const MovieFilter = () => {
  const [category, setCategory] = useState("All");
  const movies = useSelector(selectMovies);

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const allCategories = [
    "All",
    ...new Set(movies.map((movie) => movie.category)),
  ];

  const filterMovies = (cat) => {
    setCategory(cat); //category (cate)
    dispatch(FILTER_BY_CATEGORY({ movies, category: cat }));
  };

  return (
    <div className={styles.filter}>
      <h4>Categories</h4>
      <div className={styles.category}>
        {allCategories.map((cat, index) => {
          return (
            <button
              key={index}
              type="button"
              className={`${category}` === cat ? `${styles.active}` : null}
              onClick={() => filterMovies(cat)}
            >
              &#8250; {cat}
            </button>
          );
        })}
      </div>
      <br />
    </div>
  );
};

export default MovieFilter;
