import { createSlice } from '@reduxjs/toolkit';

//CONSTRUCT REDUX

// #1. CREATE INITIAL STATE
const initialState = {
  cart: [],

  // // For dev purposes
  // cart: [
  //   {
  //     pizzaId: 12,
  //     name: 'Mediterranean',
  //     quantity: 2,
  //     unitPrice: 16,
  //     totalPrice: 32,
  //   },
  // ],
};
// #2. CREATE USER SLICE
const cartSlice = createSlice({
  // #2.1 NAME OF THE SLICE FEATURE
  name: 'cart',
  // #2.2 PROVIDE INITIAL STATE
  initialState,
  // #2.3 DECLARE REDUCERS
  reducers: {
    // #2.3.1 DECLARE ACTION CREATOR FOR STATE UPDATE
    addItem(state, action) {
      // > payload = newItem
      state.cart.push(action.payload);
    },
    // #2.3.1 DECLARE ACTION CREATOR FOR STATE UPDATE
    deleteItem(state, action) {
      // > payload = pizzaId
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    // #2.3.1 DECLARE ACTION CREATOR FOR STATE UPDATE
    increaseItemQuantity(state, action) {
      // > payload = pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      //  DERIVED STATE
      item.totalPrice = item.quantity * item.unitPrice;
    },
    // #2.3.1 DECLARE ACTION CREATOR FOR STATE UPDATE
    decreaseItemQuantity(state, action) {
      // > payload = pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;

      // GUARD CLAUSE - CHECK IF DROPS BELOW QTY:1 CALL DELETEITEM ACTION CREATOR TO DROP THE ITEM
      if (item.quantity < 1) cartSlice.caseReducers.deleteItem(state, action);
      //  DERIVED STATE
      item.totalPrice = item.quantity * item.unitPrice;
    },
    // #2.3.1 DECLARE ACTION CREATOR FOR STATE UPDATE
    clearCart(state) {
      state.cart = [];
    },
  },
});

//SELECTOR FUNCTIONS RELATED TO CART STATE
// NOTE: CONSIDER 'RESELECT' LIBRARY IN ORDER TO INCREASE PERFORMANCE OF REDUX APP RATHER THAN MANUALLY CREATING ONE
// IMPORTANT!!! ITS A CUSTOM TO DECLARE ALL HELPER FUNCTIONS STARTING WITH GET*****
export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);
export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);
export const getCart = (state) => state.cart.cart;
export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

// IMPORTED BY PROPER COMPONENTS TO TRIGGER A SPECIFIED UPDATE VIA THESE ACTION CREATOR FUNCTIONS
export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;
// THIS EXPORT IS USED TO SETUP OUR STORE
export default cartSlice.reducer;
