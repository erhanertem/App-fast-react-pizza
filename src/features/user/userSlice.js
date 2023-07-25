import { createSlice } from '@reduxjs/toolkit';

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

const initialState = {
  username: '',
};

//SLICE OF OUR GLOBAL UI STATE
const userSlice = createSlice({
  //REDUCER NAME
  name: 'user',
  initialState,
  reducers: {
    //REDUCER ACTIONS
    updateName(state, action) {
      state.username = action.payload;
    },
  },
});

//EXPORT REDUCER ACTIONS
export const { updateName } = userSlice.actions;

//EXPORT REDUCER SLICE
export default userSlice.reducer;

//REDUX RECOMMENDS PUTTING ALL STATE RELATED FUNCTIONS PUT INSIDE THE SLICER FILE AND START WITH GET***** NAMING CONVENTION
export const getUsername = (state) => state.cart.username;
