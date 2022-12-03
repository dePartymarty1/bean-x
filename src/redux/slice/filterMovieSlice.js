// Movie Search Slice
// Search with filter
// rxslice 

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    filteredMovies: [], //empty array
}
const filterMovieSlice = createSlice({
  name: "filterMovie",
  initialState,
  reducers: { // search by name 
    FILTER_BY_SEARCH(state, action) {
        // console.log(action.payload)
        const {movies, search} = action.payload;
        const tempMovies = movies.filter(
          (movie) => 
          movie.name.toLowerCase().includes(search.toLowerCase())// take the tempProducts we get from the list and filter through it
        )
        // check list of product and if anything matches with name then display product
        state.filteredMovies = tempMovies; // puts temp products into our empty array
    },
    FILTER_BY_CATEGORY(state, action) {
      const { movies, category } = action.payload;
      let tempMovies = [];
      if (category === "All") {
        tempMovies = movies;
      } else {
        tempMovies = movies.filter(
          (movie) => movie.category === category
        );
      }
      state.filteredMovies = tempMovies;
    },
  }
});

export const {
  FILTER_BY_SEARCH,
  SORT_PRODUCTS,
  FILTER_BY_CATEGORY,
} = filterMovieSlice.actions;

export const selectFilteredMovies = (state) => state.filterMovie.filteredMovies; // filter is name of the slice and 

export default filterMovieSlice.reducer; // need to add reducer to the store in store.js