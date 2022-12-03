// Product Search Slice
// Search with filter
// rxslice 

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    filteredProducts: [], //empty array
}
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: { // search by name 
    FILTER_BY_SEARCH(state, action) {
        // console.log(action.payload)
        const {products, search} = action.payload;
        const tempProducts = products.filter(
          (product) => 
            product.name.toLowerCase().includes(search.toLowerCase())// take the tempProducts we get from the list and filter through it
        )
        // check list of product and if anything matches with name then display product
        state.filteredProducts = tempProducts; // puts temp products into our empty array
    },
    FILTER_BY_CATEGORY(state, action) {
      const { products, category } = action.payload;
      let tempProducts = [];
      if (category === "All") {
        tempProducts = products;
      } else {
        tempProducts = products.filter(
          (product) => product.category === category
        );
      }
      state.filteredProducts = tempProducts;
    },
  }
});

export const {
  FILTER_BY_SEARCH,
  SORT_PRODUCTS,
  FILTER_BY_CATEGORY,
} = filterSlice.actions;

export const selectFilteredProducts = (state) => state.filter.filteredProducts; // filter is name of the slice and 

export default filterSlice.reducer; // need to add reducer to the store in store.js