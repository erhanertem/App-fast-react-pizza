import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAddress } from '../../services/apiGeocoding';

function getPosition() {
  // GEOLOCATION ASYNC API AND NEEDS TO BE PROMISIFIED TO BE USED WITH ASYNC/AWAIT COMPOSITIONS
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// ***************************************************************
/* CREATEASYNC THUNK WILL YIELD THREE ADDITONAL ACTION TYPES: 
1. PENDING
2. FULFILLED
3. REJECTED
WHICH SHOULD BE HANDLED IN THE REDUCER
*/
export const fetchAddress = createAsyncThunk(
  // #1. ACTION TYPE NAME
  // NOTE: WE WILL NEVER USE THIS ACTION TYPE NAME BUT RTK NEEDS IT TO CALL THE ANONYMOUS FUNCTION INTERNALLY
  'user/fetchAddres',
  // #2. ASYNC ANONYMOUS FUNCTION TO CALL
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    console.log(positionObj);
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    // > Becomes the payload of fulfilled state
    return { position, address };
  },
);
// ***************************************************************

//CONSTRUCT REDUX

// #1. CREATE INITIAL STATE
const initialState = {
  username: '',
  // ASYNC REDUX THUNK RELATED STATES
  status: 'idle',
  position: {},
  address: '',
  error: '',
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
  // #2.4 HANDLE NATIVE createAsyncThunk MIDDLEWARE
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.status = 'idle';
        state.position = action.payload.position;
        state.address = action.payload.address;
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = 'error';
        // state.error = action.error.message;
        state.error =
          'There was a problem getting your address. Make sure to fill this field!';
      }),
});

// > DEFINE SELECTORS RELATED TO USER STATE
// NOTE: CONSIDER 'RESELECT' LIBRARY IN ORDER TO INCREASE PERFORMANCE OF REDUX APP RATHER THAN MANUALLY CREATING ONE
// IMPORTANT!!! ITS A CUSTOM TO DECLARE ALL HELPER FUNCTIONS STARTING WITH GET*****
export const getUser = (state) => state.user;
// IMPORTED BY PROPER COMPONENTS TO TRIGGER A SPECIFIED UPDATE VIA THESE ACTION CREATOR FUNCTIONS
export const { updateName } = userSlice.actions;
// THIS EXPORT IS USED TO SETUP OUR STORE
export default userSlice.reducer;
