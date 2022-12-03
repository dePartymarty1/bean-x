// rxslice for redux slice template
// this file is for storing and saving things we add for redux store
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [], // save all products fetched from firebase store
  // minPrice: null,
  // maxPrice: null,
};

const productSlice = createSlice({
  name: "product", // matches database
  initialState,
  reducers: { // action we want to execute, store our products in Redux
    STORE_PRODUCTS(state, action) {
      //   console.log(action.payload);
      state.products = action.payload.products; // saved list of products to this redux state now it is accessible thoughout the application
    },
  },
});

export const { STORE_PRODUCTS } = productSlice.actions;

export const selectProducts = (state) => state.product.products; // everytime you want to select this product from redux store, reference this 
// export const selectMinPrice = (state) => state.product.minPrice;
// export const selectMaxPrice = (state) => state.product.maxPrice;

export default productSlice.reducer;
