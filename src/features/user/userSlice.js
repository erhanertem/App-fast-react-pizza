import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";

// --> RTK NATIVE ASYNC THUNK MIDDLEWARE CREATION
/*
This thunk function creates additional 3 action types :
1. Fullfilled state
2. Pending state
3. Rejected state
*/
// UTILITY FUNCTION
function getPosition() {
  const options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 };

  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}
// EXPORT NATIVE RTK THUNK FUNCTION
export const fetchAddress = createAsyncThunk(
  // > #1. ACTION TYPE - 'feature name/action type name'
  // NOTE: REDUX NEEDS THIS FOR INTERNAL USE AND WILL NEVER BE USED BY US!
  // NOTE: By convention action function name starts with fetch... Do not use something that starts with get...It's reserved internally
  "user/fetchAddress",
  // > #2. ACTUAL ASYNC THUNK FUNCTION WE WANT TO RUN
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    console.log("positionObj :", positionObj);
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    // > #3. BECOMES THE PAYLOAD OF FULLFILLED STATE
    return { position, address };
  },
);

// #1. SET INITIAL STATE OBJECT - CREATE A SLICE OF GLOBAL UI STATE
const initialState = {
  username: "",
  status: "idle",
  position: {},
  address: "",
  error: "",
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
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = "idle";
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        // state.error = action.error.message;
        state.error =
          "There was a problem getting your address. Make sure to fill this field!";
        state.status = "error";
      }),
});
// #3. EXPORT SYNC ACTION CREATOR FUNCTIONS - USED BY COMPONENT EVENTHANDLERS
export const { updateName } = userSlice.actions;
// #4. EXPORT REDUCER - USED BY STORE FOR CONFIGURING THE RTK STORE
export default userSlice.reducer;

// COMPLEX RTK STORE USESELECTOR READ FUNCTIONS KEPT HERE - convention is to start these functions with get
export const getUser = (state) => state.user;
