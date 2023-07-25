import { configureStore } from '@reduxjs/toolkit';

//IMPORT REDUCER SLICE
import userReducer from './features/user/userSlice';
import cartReducer from './features/cart/cartSlice';

//CREATE STORE
const store = configureStore({
  reducer: {
    //REDUCER SLICE
    user: userReducer,
    //REDUCER SLICE
    cart: cartReducer,
  },
});

export default store;
