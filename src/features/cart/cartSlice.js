import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // cart: [],

  cart: [
    {
      pizzaId: 12,
      name: 'Milano',
      quantity: 2,
      unitPrice: 16,
      totalPrice: 32,
    },
  ],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      //payload is the newItem
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      //payload is pizzaId
      state.cart = state.cart.filter((item) => item !== action.payload);
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
