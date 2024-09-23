/*
function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

async function fetchAddress() {
  // 1) We get the user's geolocation position
  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  // 3) Then we return an object with the data that we are interested in
  return { position, address };
}

*/

import { createSlice } from "@reduxjs/toolkit";

// #1. SET INITIAL STATE OBJECT - CREATE A SLICE OF GLOBAL UI STATE
const initialState = {
  username: "",
};
// #2. SETUP RTK SLICER (REDUCER FUNCTION + ACTION CREATORS)
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
});
// #3. EXPORT SYNC ACTION CREATOR FUNCTIONS - USED BY COMPONENT EVENTHANDLERS
export const { updateName } = userSlice.actions;
// #4. EXPORT REDUCER - USED BY STORE FOR CONFIGURING THE RTK STORE
export default userSlice.reducer;
