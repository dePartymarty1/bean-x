// Redux Imports
import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit"
import authReducer from "./slice/authSlice"
import productReducer from "./slice/productSlice"
import filterReducer from "./slice/filterSlice"
import cartReducer from "./slice/cartSlice"
import movieReducer from "./slice/movieSlice"
import filterMovieReducer from "./slice/filterMovieSlice"


const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer, // from productSlice file where products are saved from redux store
    movie: movieReducer,
    filter: filterReducer, // from filterSlice file for search component 
    filterMovie: filterMovieReducer,
    cart: cartReducer,

});
// REDUCER: In redux, the reducers are the pure functions that contain the logic and calculation that needed to be performed on the 
// state. These functions accept the initial state of the state being used and the action type. It updates the 
// state and responds with the new state. This updated state is sent back to the view components of the react to
// make the necessary changes. Basically, In short, we can say that Reducer’s work is to return the updated state and to also describe how the state changes.

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export default store
