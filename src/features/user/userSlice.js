import { createSlice } from '@reduxjs/toolkit';
// import { getAddress } from '../../services/apiGeocoding';

// function getPosition() {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// }

// async function fetchAddress() {
//   // 1) We get the user's geolocation position
//   const positionObj = await getPosition();
//   const position = {
//     latitude: positionObj.coords.latitude,
//     longitude: positionObj.coords.longitude,
//   };

//   // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
//   const addressObj = await getAddress(position);
//   const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

//   // 3) Then we return an object with the data that we are interested in
//   return { position, address };
// }

//CONSTRUCT REDUX

// #1. CREATE INITIAL STATE
const initialState = {
  username: '',
};
// #2. CREATE USER SLICE
const userSlice = createSlice({
  // #2.1 NAME OF THE SLICE FEATURE
  name: 'user',
  // #2.2 PROVIDE INITIAL STATE
  initialState,
  // #2.3 DECLARE REDUCERS
  reducers: {
    // #2.3.1 DECLARE ACTION CREATOR FOR STATE UPDATE
    updateName(state, action) {
      state.username = action.payload;
    },
  },
});

// IMPORTED BY PROPER COMPONENTS TO TRIGGER A SPECIFIED UPDATE VIA THESE ACTION CREATOR FUNCTIONS
export const { updateName } = userSlice.actions;
// THIS EXPORT IS USED TO SETUP OUR STORE
export default userSlice.reducer;
