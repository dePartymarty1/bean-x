import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false, 
    email: null,
    userName: null,
    userID: null,
}
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: { //actions
    SET_ACTIVE_USER: (state, action) => { // Code is dispatched from the frontend of the site is fired
        console.log(action.payload)
        const {email, userName, userID} = action.payload
        state.isLoggedIn = true; //user is logged in
        state.email = email;
        state.userName = userName;
        state.userID = userID; 
    },
    REMOVE_ACTIVE_USER: (state, action) => { // Code is dispatched from the frontend of the site is fired
      state.isLoggedIn = false; //user is logged in
      state.email = null;
      state.userName = null;
      state.userID = null; 
  }
  }
});

export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } = authSlice.actions

// Export components from initialState
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectEmail = (state) => state.auth.email;
export const selectUserName = (state) => state.auth.userName;
export const selectUserID = (state) => state.auth.userID;

export default authSlice.reducer