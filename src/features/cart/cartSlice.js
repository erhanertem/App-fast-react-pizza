import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],

  // cart: [
  //   {
  //     pizzaId: 12,
  //     name: 'Milano',
  //     quantity: 2,
  //     unitPrice: 16,
  //     totalPrice: 32,
  //   },
  // ],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      //payload is the newItem provided @MenuItem.jsx
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      //payload is pizzaId
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    clearCart(state) {
      //do not need action here, so omitted
      state.cart = [];
    },
    increaseItemQuantity(state, action) {
      //payload pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      //payload pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      //IF DEDUCTION IS EQUAL ZERO PIZZA ITEM - REMOVE IT FROM THE CART!! CHECK
      // console.log(cartSlice);
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action); //VERY IMPORTANT - CALLING A REDUCER FUNCTION WITHIN A REDUCER OBJECT... caseReducers encapsulates all the functions within the reducer!
    },
  },
});

export const {
  addItem,
  deleteItem,
  clearCart,
  increaseItemQuantity,
  decreaseItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;

//REDUX RECOMMENDS PUTTING ALL STATE RELATED FUNCTIONS PUT INSIDE THE SLICER FILE AND START WITH GET***** NAMING CONVENTION
export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCart = (state) => state.cart.cart;

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
