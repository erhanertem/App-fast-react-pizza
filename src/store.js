import { configureStore } from "@reduxjs/toolkit";

// #1. IMPORT SLICE REDUCER
import userReducer from "./features/user/userSlice";

// #2. CONFIGURE THE REDUX STORE FOR MULTI ROOT SETUP
const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// #3. EXPORT THE REDUX STORE
export default store;
