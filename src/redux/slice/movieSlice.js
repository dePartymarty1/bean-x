import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  movies: []
}

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    STORE_MOVIES(state, action) {
      state.movies = action.payload.movies
    }
  }
});

export const {STORE_MOVIES} = movieSlice.actions

export const selectMovies = (state) => state.movie.movies;

export default movieSlice.reducer