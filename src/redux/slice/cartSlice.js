import { createSlice } from '@reduxjs/toolkit'
import { toast } from "react-toastify";

const initialState = {
    // Need to save to local storage, if you want to get something to local storage you have to use JSON.parse
    cartItems: localStorage.getItem("cartItems") 
    ? JSON.parse(localStorage.getItem("cartItems")) 
    : [],
    // This is saying if cartItems does exist in local storage then (?) then set it to the value of cart items (:) if it doesnt exist make it an empty array
    cartTotalQuanity: 0,
    cartTotalAmount: 0,
    previousURL: "",
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: { // Actions
    ADD_TO_CART(state, action) {
        const productIndex = state.cartItems.findIndex(
            (item) => item.id === action.payload.id // if it doesnt return anything it is -1
    );
    if (productIndex >= 0) {
        // Item already exists in the cart then it starts here, a fresh cart starts at the else portion 
        // Increase the cartQuantity
        state.cartItems[productIndex].cartQuantity += 1; // array of producct index which is the productIndex in the function above, then adds 1 to the cart quanitiy
      } else {
        // Item doesn't exists in the cart
        // Add item to the cart
        const tempProduct = { ...action.payload, cartQuantity: 1 }; // created temporary product we push 1 into it
        state.cartItems.push(tempProduct); // we push temp products that has the quanity of 1 
        toast.success(`${action.payload.name} added to cart`, { // on success adds to cart, action.payload.name is the specific item in the cart which is dynamic
          position: "top-left",
        });
      }
      // save cart to Local Storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems)); // saves cartItems and converts with json stringify 
    },
    DECREASE_CART(state, action) {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id // if it doesnt return anything it is -1
    );
    if (state.cartItems[productIndex].cartQuantity > 1) { // if greater than 1 then set quantity to subtract 1
      state.cartItems[productIndex].cartQuantity -= 1
    } else if (state.cartItems[productIndex].cartQuantity === 1) { 
      const newCartItem = state.cartItems.filter((item) => item.id !== action.payload.id) // want to delete product, if that product is equal to 1 then we create a new array called newCartItems and it contains all the items in the cart execpt the item we choose to decrease
      state.cartItems = newCartItem
    }
    localStorage.setItem("cartItems", JSON.stringify(state.cartItems)); // saves cartItems and converts with json stringify 
    },
    CALCULATE_SUBTOTAL(state, action) {
      const array = []
      // map through the cartItems
      state.cartItems.map((item) => {
        const {price, cartQuantity} = item
        const cartItemAmount = price * cartQuantity
        return array.push(cartItemAmount);
      });
      const totalAmount = array.reduce((a, b) => {
        return a + b // takes all of the elements in the array and adds them 
      }, 0);
      state.cartTotalAmount = totalAmount
    },
    CALCULATE_TOTAL_QUANTITY(state, action) {
      const array = [];
      state.cartItems.map((item) => {
        const { cartQuantity } = item;
        const quantity = cartQuantity;
        return array.push(quantity);
      });
      const totalQuantity = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.cartTotalQuantity = totalQuantity;
    },
  }
});

export const {ADD_TO_CART, DECREASE_CART, CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY} = cartSlice.actions

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;
export const selectPreviousURL = (state) => state.cart.previousURL;

export default cartSlice.reducer