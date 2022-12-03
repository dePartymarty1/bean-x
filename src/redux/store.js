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


const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export default store
