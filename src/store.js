import { configureStore } from '@reduxjs/toolkit';

//IMPORT REDUCER SLICE
import userReducer from './features/user/userSlice';

//CREATE STORE
const store = configureStore({
  reducer: {
    //REDUCER SLICE
    user: userReducer,
  },
});

export default store;
